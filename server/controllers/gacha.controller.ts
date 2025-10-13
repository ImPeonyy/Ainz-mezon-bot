import { getGachaCount, getPetsByRarity, updateGachaCount, upsertUserPetCount } from '@/services';
import {
    textMessage,
    getGachaMessage,
    getGachaCountMessage,
    getNormalGachaMessage,
    getMidAutumn2025GachaMessage,
    getRandomPet
} from '@/utils';
import { ERarity, Prisma, User } from '@prisma/client';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { prisma } from '@/lib/db';
import { MezonClient } from 'mezon-sdk';
import { BOT_ID, EGachaStatus, GACHA_COUNT_LIMIT } from '@/constants';
import { worldAnnouncementController } from './misc.controller';

const activeGachas = new Map<
    string,
    {
        userId: string;
        messageFetch: any;
        expireTimer: NodeJS.Timeout | null;
    }
>();

const closeGacha = (userId: string) => {
    const activeGacha = activeGachas.get(userId);
    if (activeGacha) {
        if (activeGacha.expireTimer) {
            clearTimeout(activeGacha.expireTimer);
        }
        activeGachas.delete(userId);
    }
};

export const hasActiveGacha = (userId: string): boolean => {
    return activeGachas.has(userId);
};

export const forceCloseUserGacha = async (userId: string): Promise<boolean> => {
    const activeGacha = activeGachas.get(userId);
    if (activeGacha) {
        try {
            await activeGacha.messageFetch.update(textMessage('🔒 Gacha has been closed by the system!'));
        } catch (error) {
            console.error('Error updating gacha message:', error);
        }
        closeGacha(userId);
        return true;
    }
    return false;
};

export const gachaController = async (
    user: User,
    message: Message,
    channel: any,
    client: MezonClient,
    targetRaw?: string | null
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Getting your gacha count... Plz wait!'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const gachaCount = await getGachaCount(prisma, user.id);
        if (!gachaCount) {
            await messageFetch.update(textMessage('🚨 Gacha count not found!'));
            return;
        }

        if (targetRaw) {
            switch (targetRaw.toLowerCase()) {
                // case 'normal':
                //     await normalGachaController(user, message, channel, client, gachaCount);
                //     return;
                // case 'ma2025':
                //     await midAutumn2025GachaController(user, messageFetch, channel, client, gachaCount);
                //     return;
                default:
                    await messageFetch.update(textMessage('🚨 Invalid gacha type!'));
                    return;
            }
        }

        await messageFetch.update(getGachaCountMessage(gachaCount));
        return;
    } catch (error) {
        console.error('Error getting gacha count:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const normalGachaController = async (
    existingUser: User,
    message: Message,
    channel: any,
    client: MezonClient,
    gachaCount: Prisma.GachaCountGetPayload<{ include: { user: true } }>
) => {
    if (activeGachas.has(existingUser.id)) {
        await message.reply(
            textMessage('❌ You already have an active gacha! Please close the current gacha before opening a new one.')
        );
        return;
    }

    let messageFetch: any;
    try {
        const messageReply = await message.reply(getNormalGachaMessage(gachaCount));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const expireTimer = setTimeout(
            () => {
                closeGacha(existingUser.id);
                if (messageFetch) {
                    messageFetch.update(textMessage('⏰ Gacha has expired and has been closed automatically!'));
                }
            },
            3 * 60 * 1000
        );

        activeGachas.set(existingUser.id, {
            userId: existingUser.id,
            messageFetch,
            expireTimer
        });

        // client.onMessageButtonClicked(async (event: any) => {
        //     const { sender_id, user_id, button_id, extra_data } = event;
        //     if (sender_id === BOT_ID && user_id === existingUser.id && messageFetch.id === event.message_id) {
        //         if (button_id === EShopExchangeStatus.CANCEL) {
        //             await messageFetch.update(textMessage('🚨 Shop has been canceled!'));
        //             closeShop(existingUser.id);
        //             return;
        //         }
        //         if (button_id === EShopExchangeStatus.EXCHANGE) {
        //             const parsedExtraData = JSON.parse(extra_data);
        //             const amount = Number(parsedExtraData.mezon_token_value);

        //             if (amount < 1000) {
        //                 await messageFetch.update(
        //                     getShopExchangeMessage(existingUser, amount, '🚨 The minimum amount is 1000₫!')
        //                 );
        //                 return;
        //             }
        //             if (!isValidNumber(amount)) {
        //                 await messageFetch.update(
        //                     getShopExchangeMessage(existingUser, amount, '🚨 The amount must be a valid number!')
        //                 );
        //                 return;
        //             }
        //             if (!Number.isInteger(amount)) {
        //                 await messageFetch.update(
        //                     getShopExchangeMessage(existingUser, amount, 'The amount must be an integer!')
        //                 );
        //                 return;
        //             }
        //             if (amount > existingUser.mezon_token) {
        //                 await messageFetch.update(
        //                     getShopExchangeMessage(existingUser, amount, '🚨 You do not have enough mezon token!')
        //                 );
        //                 return;
        //             }

        //             const zCoinAfterExchange = getZCoinAfterExchange(amount);
        //             await updateUser(
        //                 prisma,
        //                 { id: existingUser.id },
        //                 { mezon_token: { decrement: amount }, z_coin: { increment: zCoinAfterExchange } }
        //             );
        //             await messageFetch.update(
        //                 textMessage(`🎉 You have exchanged [ ${amount}₫ ] for [ ${zCoinAfterExchange}💰 ]!`)
        //             );
        //             closeShop(existingUser.id);
        //         }
        //     }
        // });
    } catch (error) {
        console.error('Error getting normal gacha:', error);
        closeGacha(existingUser.id);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const midAutumn2025GachaController = async (
    existingUser: User,
    messageFetch: Message,
    channel: any,
    client: MezonClient,
    gachaCount: Prisma.GachaCountGetPayload<{ include: { user: true } }>
) => {
    if (activeGachas.has(existingUser.id)) {
        await messageFetch.update(
            textMessage('❌ You already have an active gacha! Please close the current gacha before opening a new one.')
        );
        return;
    }

    try {
        await messageFetch.update(getMidAutumn2025GachaMessage(gachaCount));

        const expireTimer = setTimeout(() => {
            closeGacha(existingUser.id);
            if (messageFetch) {
                messageFetch.update(textMessage('⏰ Gacha has expired and has been closed automatically!'));
            }
        }, 60 * 1000);

        activeGachas.set(existingUser.id, {
            userId: existingUser.id,
            messageFetch,
            expireTimer
        });

        const limitedPets = await getPetsByRarity(ERarity.Limited);

        const randomLimitedPet = getRandomPet(limitedPets);

        client.onMessageButtonClicked(async (event: any) => {
            const { sender_id, user_id, button_id } = event;
            if (sender_id === BOT_ID && user_id === existingUser.id && messageFetch.id === event.message_id) {
                if (button_id === EGachaStatus.CANCEL) {
                    await messageFetch.update(textMessage('🚨 Gacha has been canceled!'));
                    closeGacha(existingUser.id);
                    return;
                }
                if (button_id === EGachaStatus.GACHA) {
                    if (gachaCount.mid_autumn_2025 < GACHA_COUNT_LIMIT.MID_AUTUMN_2025) {
                        await messageFetch.update(
                            getMidAutumn2025GachaMessage(gachaCount, "🚨 You don't have enough gacha points!")
                        );
                        return;
                    }

                    await prisma.$transaction(async (tx) => {
                        await updateGachaCount(tx, existingUser.id, {
                            mid_autumn_2025: { decrement: GACHA_COUNT_LIMIT.MID_AUTUMN_2025 }
                        });
                        await upsertUserPetCount(tx, existingUser.id, randomLimitedPet);
                    });
                    await messageFetch.update(getGachaMessage(randomLimitedPet));
                    await worldAnnouncementController(existingUser, [randomLimitedPet], client);
                    closeGacha(existingUser.id);
                }
            }
        });
    } catch (error) {
        console.error('Error getting mid autumn 2025 gacha:', error);
        closeGacha(existingUser.id);
        await messageFetch.update(textMessage('❌ Internal server error'));
        return;
    }
};
