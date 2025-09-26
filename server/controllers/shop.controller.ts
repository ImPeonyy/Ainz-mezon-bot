import {
    getShopExchangeMessage,
    textMessage,
    getZCoinAfterExchange,
    getShopUpLevelPetMessage,
    expToPetLevel,
    getPetLevelFromExp,
    isValidNumber
} from '@/utils';
import { User } from '@prisma/client';
import { MezonClient } from 'mezon-sdk';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { BOT_ID, EShopExchangeStatus, EShopUpLevelPetStatus } from '@/constants';
import { getUser, getUserPetById, getUserPets, updateUser, updateUserPet } from '@/services';
import { prisma } from '@/lib/db';

type ShopStatus = {
    button_id: EShopExchangeStatus;
    extra_data: any;
};

const activeShops = new Map<
    string,
    {
        userId: string;
        messageFetch: any;
        expireTimer: NodeJS.Timeout | null;
    }
>();

const closeShop = (userId: string) => {
    const activeShop = activeShops.get(userId);
    if (activeShop) {
        if (activeShop.expireTimer) {
            clearTimeout(activeShop.expireTimer);
        }
        activeShops.delete(userId);
    }
};

// Utility function để kiểm tra xem user có shop active không
export const hasActiveShop = (userId: string): boolean => {
    return activeShops.has(userId);
};

// Utility function để force close shop của user (có thể dùng cho admin)
export const forceCloseUserShop = async (userId: string): Promise<boolean> => {
    const activeShop = activeShops.get(userId);
    if (activeShop) {
        try {
            await activeShop.messageFetch.update(textMessage('🔒 Shop has been closed by the system!'));
        } catch (error) {
            console.error('Error updating shop message:', error);
        }
        closeShop(userId);
        return true;
    }
    return false;
};

export const exchangeController = async (existingUser: User, message: Message, channel: any, client: MezonClient) => {
    // Kiểm tra xem user đã có shop active chưa
    if (activeShops.has(existingUser.id)) {
        await message.reply(
            textMessage('❌ You already have an active shop! Please close the current shop before opening a new one.')
        );
        return;
    }

    let messageFetch: any;
    try {
        const messageReply = await message.reply(getShopExchangeMessage(existingUser));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        // Tạo timer để tự động đóng shop sau 5 phút
        const expireTimer = setTimeout(
            () => {
                closeShop(existingUser.id);
                if (messageFetch) {
                    messageFetch.update(textMessage('⏰ Shop has expired and has been closed automatically!'));
                }
            },
            3 * 60 * 1000
        ); // 3 phút

        // Lưu shop vào activeShops
        activeShops.set(existingUser.id, {
            userId: existingUser.id,
            messageFetch,
            expireTimer
        });

        client.onMessageButtonClicked(async (event: any) => {
            const { sender_id, user_id, button_id, extra_data } = event;
            if (sender_id === BOT_ID && user_id === existingUser.id && messageFetch.id === event.message_id) {
                if (button_id === EShopExchangeStatus.CANCEL) {
                    await messageFetch.update(textMessage('🚨 Shop has been canceled!'));
                    closeShop(existingUser.id);
                    return;
                }
                if (button_id === EShopExchangeStatus.EXCHANGE) {
                    const parsedExtraData = JSON.parse(extra_data);
                    const amount = Number(parsedExtraData.mezon_token_value);

                    if (amount < 1000) {
                        await messageFetch.update(
                            getShopExchangeMessage(existingUser, amount, '🚨 The minimum amount is 1000₫!')
                        );
                        return;
                    }
                    if (!isValidNumber(amount)) {
                        await messageFetch.update(
                            getShopExchangeMessage(existingUser, amount, '🚨 The amount must be a valid number!')
                        );
                        return;
                    }
                    if (!Number.isInteger(amount)) {
                        await messageFetch.update(
                            getShopExchangeMessage(existingUser, amount, 'The amount must be an integer!')
                        );
                        return;
                    }
                    if (amount > existingUser.mezon_token) {
                        await messageFetch.update(
                            getShopExchangeMessage(existingUser, amount, '🚨 You do not have enough mezon token!')
                        );
                        return;
                    }

                    const zCoinAfterExchange = getZCoinAfterExchange(amount);
                    await updateUser(
                        prisma,
                        { id: existingUser.id },
                        { mezon_token: { decrement: amount }, z_coin: { increment: zCoinAfterExchange } }
                    );
                    await messageFetch.update(
                        textMessage(`🎉 You have exchanged [ ${amount}₫ ] for [ ${zCoinAfterExchange}💰 ]!`)
                    );
                    closeShop(existingUser.id);
                }
            }
        });
    } catch (error) {
        console.error('Error getting exchange shop:', error);
        closeShop(existingUser.id);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const upLevelPetController = async (existingUser: User, message: Message, channel: any, client: MezonClient) => {
    // Kiểm tra xem user đã có shop active chưa
    if (activeShops.has(existingUser.id)) {
        await message.reply(
            textMessage(
                '❌ You already have an Power Up Pet Shop! Please close the current shop before opening a new one.'
            )
        );
        return;
    }

    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Retrieving your pets...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const userPet = await getUserPets(prisma, existingUser.id);
        await messageFetch.update(getShopUpLevelPetMessage(existingUser, userPet));

        // Tạo timer để tự động đóng shop sau 5 phút
        const expireTimer = setTimeout(
            () => {
                closeShop(existingUser.id);
                if (messageFetch) {
                    messageFetch.update(textMessage('⏰ Shop has expired and has been closed automatically!'));
                }
            },
            3 * 60 * 1000
        ); // 3 phút

        // Lưu shop vào activeShops
        activeShops.set(existingUser.id, {
            userId: existingUser.id,
            messageFetch,
            expireTimer
        });

        client.onMessageButtonClicked(async (event: any) => {
            const { sender_id, user_id, button_id, extra_data } = event;
            if (sender_id === BOT_ID && user_id === existingUser.id && messageFetch.id === event.message_id) {
                const currentUser = await getUser(existingUser.id);
                const currentUserPet = await getUserPets(prisma, existingUser.id);
                if (currentUser && currentUserPet) {
                    if (button_id === EShopUpLevelPetStatus.CANCEL) {
                        await messageFetch.update(textMessage('🚨 Shop has been canceled!'));
                        closeShop(currentUser.id);
                        return;
                    }
                    if (button_id === EShopUpLevelPetStatus.UP_LEVEL) {
                        const parsedExtraData = JSON.parse(extra_data);
                        const userPet = await getUserPetById(parsedExtraData.user_pet_id);
                        if (!userPet) {
                            await messageFetch.update(textMessage('🚨 User pet not found!'));
                            return;
                        }
                        const userPetLevel = getPetLevelFromExp(userPet.exp);
                        if (userPetLevel < 25 && currentUser.z_coin < 1000) {
                            await messageFetch.update(
                                getShopUpLevelPetMessage(
                                    currentUser,
                                    currentUserPet,
                                    '🚨 You do not have enough Z Coin!'
                                )
                            );
                            return;
                        }

                        if (userPetLevel >= 25 && userPetLevel < 50 && currentUser.z_coin < 2000) {
                            await messageFetch.update(
                                getShopUpLevelPetMessage(
                                    currentUser,
                                    currentUserPet,
                                    '🚨 You do not have enough Z Coin!'
                                )
                            );
                            return;
                        }

                        if (userPetLevel >= 50 && userPetLevel < 75 && currentUser.z_coin < 3000) {
                            await messageFetch.update(
                                getShopUpLevelPetMessage(
                                    currentUser,
                                    currentUserPet,
                                    '🚨 You do not have enough Z Coin!'
                                )
                            );
                            return;
                        }

                        if (userPetLevel >= 75 && currentUser.z_coin < 5000) {
                            await messageFetch.update(
                                getShopUpLevelPetMessage(
                                    currentUser,
                                    currentUserPet,
                                    '🚨 You do not have enough Z Coin!'
                                )
                            );
                            return;
                        }

                        const zCoin =
                            userPetLevel < 25 ? 1000 : userPetLevel < 50 ? 2000 : userPetLevel < 75 ? 3000 : 5000;

                        const exp = expToPetLevel(userPetLevel + 1) - expToPetLevel(userPetLevel);
                        await messageFetch.update(
                            getShopUpLevelPetMessage(currentUser, currentUserPet, '🔄 Processing...', true)
                        );
                        await prisma.$transaction(async (tx) => {
                            await updateUser(tx, { id: existingUser.id }, { z_coin: { decrement: zCoin } });
                            await updateUserPet(tx, { id: userPet.id }, { exp: { increment: exp } });
                        });

                        // Sau 2 giây, fetch lại data mới và refresh shop để tiếp tục
                        setTimeout(async () => {
                            try {
                                const updatedUser = await getUser(currentUser.id);
                                const updatedUserPet = await getUserPets(prisma, currentUser.id);
                                const currentLevel = userPetLevel + 1;
                                await messageFetch.update(
                                    getShopUpLevelPetMessage(
                                        updatedUser!,
                                        updatedUserPet,
                                        '🎉 Level Up successfully! Current Level: ' + currentLevel
                                    )
                                );
                                return;
                            } catch (error) {
                                console.error('Error refreshing shop after level up:', error);
                            }
                        }, 2000);
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error getting exchange shop:', error);
        closeShop(existingUser.id);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const shopExchangeController = async (existingUser: any, message: Message, channel: any, amount: number) => {};

export const shopPetController = async (existingUser: any, message: Message, channel: any) => {};

export const shopItemController = async (existingUser: any, message: Message, channel: any) => {};
