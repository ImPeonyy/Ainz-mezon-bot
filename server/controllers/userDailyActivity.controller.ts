import {
    createUserDailyActivity,
    getTodayUserDailyActivity,
    getUser,
    updateUser,
    updateUserDailyActivity
} from '@/services';
import { getDailyReward, getMidnightRemainingTime, textMessage} from '@/utils';

import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { prisma } from '@/lib/db';

export const dailyController = async (mezon_id: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Claiming daily reward...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const user = await getUser(mezon_id);

        if (!user) {
            await messageFetch.update(textMessage('User not found'));
            return;
        }
        const todayActivity = await getTodayUserDailyActivity(user.id);

        if (todayActivity && todayActivity.daily === 1) {
            const { hours, minutes } = getMidnightRemainingTime();
            await messageFetch.update(
                textMessage(
                    `⏳ You have already received your daily reward today. Plz come back in ${hours} hours and ${minutes} minutes.`
                )
            );
            return;
        }

        const dailyReward = getDailyReward();

        if (todayActivity && todayActivity.daily === 0) {
            await prisma.$transaction(async (tx) => {
                await updateUserDailyActivity(
                    tx,
                    {
                        id: todayActivity.id
                    },
                    {
                        daily: 1
                    }
                );

                await updateUser(
                    tx,
                    {
                        id: user.id
                    },
                    {
                        z_coin: { increment: dailyReward.zCoin },
                        exp: { increment: dailyReward.exp },
                    }
                );
            });
            await messageFetch.update(
                textMessage(
                    `🎉 Daily reward claimed successfully! You have received +${dailyReward.zCoin} 💰 ZCoin and +${dailyReward.exp} ✨ EXP.`
                )
            );
            return;
        }

        await prisma.$transaction(async (tx) => {
            await createUserDailyActivity(tx, {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                daily: 1
            });

            await updateUser(
                tx,
                {
                    id: user.id
                },
                {
                    z_coin: { increment: dailyReward.zCoin },
                    exp: { increment: dailyReward.exp },
                }
            );
        });
        await messageFetch.update(
            textMessage(
                `🎉 Daily reward claimed successfully! You have received +${dailyReward.zCoin} 💰 ZCoin and +${dailyReward.exp} ⭐ EXP.`
            )
        );
        return;
    } catch (error) {
        console.error(error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error.'));
        } else {
            await message.reply(textMessage('❌ Internal server error.'));
        }
        return;
    }
};
