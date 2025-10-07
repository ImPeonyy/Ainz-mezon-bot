import { EGachaCountType } from '@/constants';
import { Prisma, PrismaClient } from '@prisma/client';

export const upserGachaCount = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    userId: string,
    type: EGachaCountType,
    count: number
) => {
    try {
        return await prismaClient.gachaCount.upsert({
            where: { userId },
            update: { [type]: { increment: count } },
            create: { userId, [type]: count }
        });
    } catch (error) {
        console.error(`Error upserting ${type} gacha count:`, error);
        throw error;
    }
};

export const getGachaCount = async (prismaClient: PrismaClient | Prisma.TransactionClient, userId: string) => {
    return await prismaClient.gachaCount.findUnique({
        where: { userId },
        include: {
            user: true
        }
    });
};

export const updateGachaCount = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    userId: string,
    data: Prisma.GachaCountUpdateInput
) => {
    return await prismaClient.gachaCount.update({
        where: { userId },
        data
    });
};

export const clearGachaCount = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    userId: string,
    type: EGachaCountType
) => {
    return await prismaClient.gachaCount.update({
        where: { userId },
        data: { [type]: 0 }
    });
};
