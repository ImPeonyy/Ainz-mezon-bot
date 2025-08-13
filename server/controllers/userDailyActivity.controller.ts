import {
    createUserDailyActivity,
    getTodayUserDailyActivity,
    getUser,
    updateUser
} from '@/services';
import { getDailyReward, getMidnightRemainingTime, textMessage } from '@/utils';

import { prisma } from '@/lib/db';

export const dailyController = async (mezon_id: string) => {
    try {
        const user = await getUser(mezon_id);

        if (!user) {
            return textMessage('User not found');
        }
        const todayActivity = await getTodayUserDailyActivity(user.id);

        if (todayActivity && todayActivity.daily === 1) {
            const { hours, minutes } = getMidnightRemainingTime();
            return textMessage(
                `⏳ You have already received your daily reward today. Please come back in ${hours} hours and ${minutes} minutes.`
            );
        }

        const dailyReward = getDailyReward();

        try {
            await prisma.$transaction(async (tx) => {
                await createUserDailyActivity(tx, {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    daily: 1,
                    hunt: 0
                });

                await updateUser(
                    tx,
                    {
                        id: user.id
                    },
                    {
                        z_coin: { increment: dailyReward.zCoin },
                        exp: { increment: dailyReward.exp }
                    }
                );
            });
            return textMessage(
                `🎉 Daily reward claimed successfully! You have received +${dailyReward.zCoin} 💰 ZCoin and +${dailyReward.exp} ⭐ EXP.`
            );
        } catch (err) {
            console.error('Transaction failed, rollback executed', err);
            return textMessage(
                '❌ Error occurred while processing the daily reward.'
            );
        }
    } catch (error) {
        console.error(error);
        return textMessage(
            '❌ Server error occurred while processing the daily reward.'
        );
    }
};
