import { getShopExchangeMessage, textMessage, getZCoinAfterExchange } from '@/utils';
import { User } from '@prisma/client';
import { MezonClient } from 'mezon-sdk';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { BOT_ID, EShopStatus } from '@/constants';
import { isValidNumber } from '@/utils/misc.util';
import { updateUser } from '@/services';
import { prisma } from '@/lib/db';

type ShopStatus = {
    button_id: EShopStatus;
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
                if (button_id === EShopStatus.CANCEL) {
                    await messageFetch.update(textMessage('🚨 Shop has been canceled!'));
                    closeShop(existingUser.id);
                    return;
                }
                if (button_id === EShopStatus.EXCHANGE) {
                    const parsedExtraData = JSON.parse(extra_data);
                    const amount = Number(parsedExtraData.mezon_token_value);

                    if (amount < 1000) {
                        await messageFetch.update(
                            getShopExchangeMessage(existingUser, amount, 'The minimum amount is 1000₫!')
                        );
                        return;
                    }
                    if (!isValidNumber(amount)) {
                        await messageFetch.update(
                            getShopExchangeMessage(existingUser, amount, 'The amount must be a valid number!')
                        );
                        return;
                    }
                    if (amount > existingUser.mezon_token) {
                        await messageFetch.update(
                            getShopExchangeMessage(existingUser, amount, 'You do not have enough mezon token!')
                        );
                        return;
                    }

                    const zCoinAfterExchange = getZCoinAfterExchange(amount);
                    await updateUser(
                        prisma,
                        { id: existingUser.id },
                        { mezon_token: { decrement: amount }, z_coin: { increment: zCoinAfterExchange } }
                    );
                    await messageFetch.update(textMessage(`🎉 You have exchanged [ ${amount}₫ ] for [ ${zCoinAfterExchange}💰 ]!`));
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

export const shopExchangeController = async (existingUser: any, message: Message, channel: any, amount: number) => {};

export const shopPetController = async (existingUser: any, message: Message, channel: any) => {};

export const shopItemController = async (existingUser: any, message: Message, channel: any) => {};
