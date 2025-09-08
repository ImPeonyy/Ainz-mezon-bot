import { Prisma, PrismaClient } from '@prisma/client';

export const getUserPets = async (prismaClient: PrismaClient | Prisma.TransactionClient, user_id: string) => {
    try {
        return await prismaClient.userPet.findMany({
            where: { user_id: user_id },
            include: {
                pet: true
            }
        });
    } catch (error) {
        console.error('Error getting user pets:', error);
        throw error;
    }
};

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

export const upsertUserPetCount = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    user_id: string,
    pet_id: number
) => {
    try {
        // Sử dụng upsert để kiểm tra và cập nhật count
        return await prismaClient.userPet.upsert({
            where: {
                user_id_pet_id: {
                    user_id: user_id,
                    pet_id: pet_id
                }
            },
            update: {
                count: {
                    increment: 1
                }
            },
            create: {
                user_id: user_id,
                pet_id: pet_id,
                count: 1
            }
        });
    } catch (error) {
        console.error('Error upserting user pet:', error);
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
