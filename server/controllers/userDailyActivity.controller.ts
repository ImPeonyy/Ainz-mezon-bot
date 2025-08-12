import { prisma } from '@/lib/db';
import { USE_DAILY_ACTIVITY } from '@/constants/Constant';
import { getTodayUserDailyActivity, createUserDailyActivity } from '@/services/userDailyActivity.service';
import { textMessage, getDailyReward, getMidnightRemainingTime } from '@/utils';
import { getUser } from '@/services';

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

        // await createUserDailyActivity(user.id, 1, 0);

        // Random Z_COIN & EXP
        const dailyReward = getDailyReward();

        try {
            await prisma.$transaction(async (tx) => {
                await tx.userDailyActivities.create({
                    data: { user_id: user.id, daily: 1 }
                });

                await tx.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        z_coin: { increment: dailyReward.zCoin },
                        exp: { increment: dailyReward.exp }
                    }
                });

                // Nếu đến đây mà không lỗi, transaction sẽ commit
            });
            return textMessage(
                `🎉 Daily reward claimed successfully! You have received +${dailyReward.zCoin} 💰 ZCoin and +${dailyReward.exp} ⭐ EXP.`
            );
        } catch (err) {
            console.error('Transaction failed, rollback executed', err);
        }
    } catch (error) {
        console.error(error);
        return textMessage('❌ Server error occurred while processing the daily reward.');
    }
};
