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
import {
    BOT_ID,
    EAsyncMutexMsgType,
    EInteractiveMessageType,
    EShopExchangeStatus,
    EShopUpLevelPetStatus
} from '@/constants';
import { getUser, getUserPetById, getUserPets, updateUser, updateUserPet } from '@/services';
import { prisma } from '@/lib/db';
import { getZCoinCost } from '@/utils/shop.util';
import { interactiveMsgManager, asyncMutexMsgManager } from '@/managers';

const shop = interactiveMsgManager;

export const exchangeController = async (existingUser: User, message: Message, channel: any, client: MezonClient) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(getShopExchangeMessage(existingUser));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const expireTimer = setTimeout(
            () => {
                shop.forceClose(
                    existingUser.id,
                    EInteractiveMessageType.EXCHANGE,
                    '⏰ Shop has expired and has been closed automatically!'
                );
            },
            3 * 60 * 1000
        ); // 3 phút

        shop.register({
            userId: existingUser.id,
            message: messageFetch,
            type: EInteractiveMessageType.EXCHANGE,
            expireTimer
        });

        client.onMessageButtonClicked(async (event: any) => {
            const { sender_id, user_id, button_id, extra_data } = event;
            if (
                sender_id === BOT_ID &&
                user_id === existingUser.id &&
                messageFetch.id === event.message_id &&
                shop.has(existingUser.id, EInteractiveMessageType.EXCHANGE)
            ) {
                if (button_id === EShopExchangeStatus.CANCEL) {
                    shop.forceClose(existingUser.id, EInteractiveMessageType.EXCHANGE, '🚨 Shop has been canceled!');
                    return;
                }
                if (button_id === EShopExchangeStatus.EXCHANGE) {
                    if (asyncMutexMsgManager.isLocked({ userId: existingUser.id, type: EAsyncMutexMsgType.EXCHANGE }))
                        return;
                    await asyncMutexMsgManager.runExclusive(
                        { userId: existingUser.id, type: EAsyncMutexMsgType.EXCHANGE },
                        async () => {
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
                                    getShopExchangeMessage(
                                        existingUser,
                                        amount,
                                        '🚨 The amount must be a valid number!'
                                    )
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
                                    getShopExchangeMessage(
                                        existingUser,
                                        amount,
                                        '🚨 You do not have enough mezon token!'
                                    )
                                );
                                return;
                            }

                            const zCoinAfterExchange = getZCoinAfterExchange(amount);
                            await updateUser(
                                prisma,
                                { id: existingUser.id },
                                { mezon_token: { decrement: amount }, z_coin: { increment: zCoinAfterExchange } }
                            );
                            shop.forceClose(
                                existingUser.id,
                                EInteractiveMessageType.EXCHANGE,
                                `🎉 You have exchanged [ ${amount}₫ ] for [ ${zCoinAfterExchange}💰 ]!`
                            );
                        }
                    );
                }
            }
        });
    } catch (error) {
        console.error('Error getting exchange shop:', error);
        shop.forceClose(existingUser.id, EInteractiveMessageType.EXCHANGE, '❌ Internal server error');
        return;
    }
};

export const upLevelPetController = async (existingUser: User, message: Message, channel: any, client: MezonClient) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Retrieving your pets...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const userPet = await getUserPets(prisma, existingUser.id);
        await messageFetch.update(getShopUpLevelPetMessage(existingUser, userPet));

        const expireTimer = setTimeout(
            () => {
                shop.forceClose(
                    existingUser.id,
                    EInteractiveMessageType.UPLV,
                    '⏰ Shop has expired and has been closed automatically!'
                );
            },
            3 * 60 * 1000
        );

        shop.register({
            userId: existingUser.id,
            message: messageFetch,
            type: EInteractiveMessageType.UPLV,
            expireTimer
        });

        client.onMessageButtonClicked(async (event: any) => {
            const { sender_id, user_id, button_id, extra_data } = event;
            if (
                sender_id === BOT_ID &&
                user_id === existingUser.id &&
                messageFetch.id === event.message_id &&
                shop.has(existingUser.id, EInteractiveMessageType.UPLV)
            ) {
                const currentUser = await getUser(existingUser.id);
                const currentUserPet = await getUserPets(prisma, existingUser.id);
                if (currentUser && currentUserPet) {
                    if (button_id === EShopUpLevelPetStatus.CANCEL) {
                        shop.forceClose(currentUser.id, EInteractiveMessageType.UPLV, '🚨 Shop has been canceled!');
                        return;
                    }
                    if (button_id === EShopUpLevelPetStatus.UP_LEVEL) {
                        if (asyncMutexMsgManager.isLocked({ userId: existingUser.id, type: EAsyncMutexMsgType.UPLV }))
                            return;

                        await asyncMutexMsgManager.runExclusive(
                            { userId: existingUser.id, type: EAsyncMutexMsgType.UPLV },
                            async () => {
                                const parsedExtraData = JSON.parse(extra_data);
                                const userPet = await getUserPetById(parsedExtraData.user_pet_id);
                                if (!userPet) {
                                    await messageFetch.update(textMessage('🚨 User pet not found!'));
                                    return;
                                }
                                const userPetLevel = getPetLevelFromExp(userPet.exp);
                                const zCoinCost = getZCoinCost(userPetLevel);
                                if (currentUser.z_coin < zCoinCost) {
                                    await messageFetch.update(
                                        getShopUpLevelPetMessage(
                                            currentUser,
                                            currentUserPet,
                                            '🚨 You do not have enough Z Coin!'
                                        )
                                    );
                                    return;
                                }

                                const exp = expToPetLevel(userPetLevel + 1) - expToPetLevel(userPetLevel);
                                await messageFetch.update(
                                    getShopUpLevelPetMessage(currentUser, currentUserPet, '🔄 Processing...', true)
                                );
                                await prisma.$transaction(async (tx) => {
                                    await updateUser(tx, { id: existingUser.id }, { z_coin: { decrement: zCoinCost } });
                                    await updateUserPet(tx, { id: userPet.id }, { exp: { increment: exp } });
                                });

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
                                }, 1000);
                            }
                        );
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error getting exchange shop:', error);
        shop.forceClose(existingUser.id, EInteractiveMessageType.UPLV, '❌ Internal server error');
        return;
    }
};

export const shopExchangeController = async (existingUser: any, message: Message, channel: any, amount: number) => {};

export const shopPetController = async (existingUser: any, message: Message, channel: any) => {};

export const shopItemController = async (existingUser: any, message: Message, channel: any) => {};
