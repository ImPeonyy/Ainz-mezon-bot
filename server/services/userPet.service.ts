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

export const getRandomUserPets = async (prismaClient: PrismaClient | Prisma.TransactionClient, user_id: string) => {
    try {
        const userPets = await prismaClient.userPet.findMany({
            include: {
                pet: {
                    include: {
                        statistic: true,
                        rarity: true,
                        autoAttack: true,
                        passiveSkill: { include: { effects: true } },
                        activeSkill: { include: { effects: true } }
                    }
                }
            },
            where: {
                teamMembers: {
                    some: {
                        team: {
                            user_id: user_id
                        }
                    }
                }
            }
        });

        return userPets;
    } catch (error) {
        console.error('Error getting random user pets:', error);
        throw error;
    }
};
