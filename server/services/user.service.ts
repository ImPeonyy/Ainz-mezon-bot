import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

export const getUser = async (mezon_id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                mezon_id: mezon_id
            }
        });
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.create({
            data: {
                username: data.username,
                mezon_id: data.mezon_id,
                avatar: data.avatar
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (data: Prisma.UserUpdateInput) => {
    try {
        return await prisma.user.update({
            where: {
                mezon_id: data.mezon_id as string
            },
            data: {
                username: data.username,
                avatar: data.avatar
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
