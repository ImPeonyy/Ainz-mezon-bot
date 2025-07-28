import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

export const getUser = async (mezon_id: string) => {
    return await prisma.user.findUnique({
        where: {
            mezon_id: mezon_id
        }
    });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({
        data: {
            username: data.username,
            mezon_id: data.mezon_id,
            avatar: data.avatar
        }
    });
};
