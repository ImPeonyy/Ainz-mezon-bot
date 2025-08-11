import { prisma } from '@/lib/db';

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
