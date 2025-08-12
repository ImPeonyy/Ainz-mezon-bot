import { prisma } from '@/lib/db';

export const getTodayUserDailyActivity = async (user_id: string) => {
    try {
        return await prisma.userDailyActivities.findFirst({
            where: {
                user_id: user_id,
                created_at: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 999))
                }
            }
        });
    } catch (error) {
        console.error('Error getting today user daily activity:', error);
        throw error;
    }
};

export const updateTodayUserDailyActivity = async (
    user_id: string,
    daily?: number,
    hunt?: number
) => {
    try {
        return await prisma.userDailyActivities.updateMany({
            where: {
                user_id,
                created_at: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 999))
                }
            },
            data: { daily, hunt }
        });
    } catch (error) {
        console.error('Error updating today user daily activity:', error);
        throw error;
    }
};

export const createUserDailyActivity = async (
    user_id: string,
    daily?: number,
    hunt?: number
) => {
    try {
        return await prisma.userDailyActivities.create({
            data: {
                user_id: user_id,
                daily: daily,
                hunt: hunt
            }
        });
    } catch (error) {
        console.error('Error creating user daily activity:', error);
        throw error;
    }
};
