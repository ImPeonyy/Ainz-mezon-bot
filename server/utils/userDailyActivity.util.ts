import { USE_DAILY_ACTIVITY } from '@/constants/Constant';
import { createUserDailyActivity, getTodayUserDailyActivity, updateTodayUserDailyActivity } from '@/services/userDailyActivity.service';



export const getDailyReward =  () => {
    const zCoinReward = getRandomInt(
        USE_DAILY_ACTIVITY.REWARD.DAILY.Z_COIN.MIN,
        USE_DAILY_ACTIVITY.REWARD.DAILY.Z_COIN.MAX
    );
    const expReward = getRandomInt(
        USE_DAILY_ACTIVITY.REWARD.DAILY.EXP.MIN,
        USE_DAILY_ACTIVITY.REWARD.DAILY.EXP.MAX
    );

    return {
        zCoin: zCoinReward,
        exp: expReward
    };
};

export function getMidnightRemainingTime() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diffMs = midnight.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
}

export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



