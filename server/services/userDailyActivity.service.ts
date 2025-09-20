import { Prisma, PrismaClient } from '@prisma/client';

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

export const createUserDailyActivity = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    data: Prisma.UserDailyActivitiesCreateInput
) => {
    try {
        return await prismaClient.userDailyActivities.create({
            data
        });
    } catch (error) {
        console.error('Error creating user daily activity:', error);
        throw error;
    }
};

export const updateUserDailyActivity = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    where: Prisma.UserDailyActivitiesWhereUniqueInput,
    data: Prisma.UserDailyActivitiesUpdateInput
) => {
    try {
        return await prismaClient.userDailyActivities.update({
            where,
            data
        });
    } catch (error) {
        console.error('Error updating user daily activity:', error);
        throw error;
    }
};