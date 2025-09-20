import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/db';

export const getUser = async (mezon_id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: mezon_id
            },
            include: {
                team: true
            }
        });
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const createUser = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    data: Prisma.UserCreateInput
) => {
    try {
        return await prismaClient.user.create({
            data
        });
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
) => {
    try {
        return await prismaClient.user.update({
            where,
            data: data
        });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
