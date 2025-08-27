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

export const getRandomUserPets = async (prismaClient: PrismaClient | Prisma.TransactionClient) => {
    try {
        const userPets = await prismaClient.userPet.findMany({
            include: {
                pet: {
                    include: {
                        statistic: true,
                        rarity: true,
                        autoAttack: true,
                        passiveSkill: true,
                        activeSkill: true
                    }
                }
            }
        });

        if (userPets.length <= 3) {
            return userPets;
        }

        const shuffled = userPets.sort(() => 0.5 - Math.random());

        return shuffled.slice(0, 3);
    } catch (error) {
        console.error('Error getting random user pets:', error);
        throw error;
    }
};
