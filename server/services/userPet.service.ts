import { Prisma, PrismaClient } from '@prisma/client';

export const createUserPet = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    data: Prisma.UserPetCreateInput
) => {
    try {
        return await prismaClient.userPet.create({
            data
        });
    } catch (error) {
        console.error('Error creating user pet:', error);
        throw error;
    }
};

export const createUserPets = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    data: Prisma.UserPetCreateManyInput[]
) => {
    try {
        return await prismaClient.userPet.createMany({
            data
        });
    } catch (error) {
        console.error('Error creating user pets:', error);
        throw error;
    }
};
