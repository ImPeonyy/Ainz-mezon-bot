import { Pet, Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/db';

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

export const getUserPetsByRarity = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    user_id: string,
    rarity: string
) => {
    try {
        return await prismaClient.userPet.findMany({
            where: { user_id: user_id, pet: { rarity: { name: { equals: rarity, mode: 'insensitive' } } } },
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
    pet: Pet
) => {
    try {
        return await prismaClient.userPet.upsert({
            where: {
                user_id_pet_id: {
                    user_id: user_id,
                    pet_id: pet.id
                }
            },
            update: {
                count: {
                    increment: 1
                }
            },
            create: {
                user_id: user_id,
                pet_id: pet.id,
                nickname: pet.name,
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

export const getUserPetByName = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    userId: string,
    petName: string
) => {
    try {
        return await prismaClient.userPet.findFirst({
            where: {
                user_id: userId,
                pet: {
                    name: {
                        equals: petName,
                        mode: 'insensitive'
                    }
                }
            },
            include: {
                pet: {
                    include: {
                        rarity: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error getting userPet by name:', error);
        throw error;
    }
};

export const updateUserPet = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    where: Prisma.UserPetWhereUniqueInput,
    data: Prisma.UserPetUpdateInput
) => {
    try {
        return await prismaClient.userPet.update({
            where,
            data
        });
    } catch (error) {
        console.error('Error updating userPet:', error);
        throw error;
    }
};

export const getUserPetDetail = async (name: string, userId: string) => {
    try {
        return prisma.userPet.findFirst({
            where: {
                user_id: userId,
                OR: [
                    {
                        nickname: {
                            equals: name,
                            mode: 'insensitive'
                        }
                    },
                    {
                        pet: {
                            name: {
                                equals: name,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            include: {
                user: true,
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
    } catch (error) {
        console.error('Error getting user pet:', error);
        throw error;
    }
};

export const getUserPetByPetName = async (userId: string, name: string) => {
    try {
        return await prisma.userPet.findFirst({
            where: {
                user_id: userId,
                OR: [
                    {
                        nickname: {
                            equals: name,
                            mode: 'insensitive'
                        }
                    },
                    {
                        pet: {
                            name: {
                                equals: name,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            }
        });
    } catch (error) {
        console.error('Error getting user pet by pet name:', error);
        throw error;
    }
};

export const getUserPetById = async (userPetId: number) => {
    try {
        return await prisma.userPet.findFirst({
            where: { id: userPetId }
        });
    } catch (error) {
        console.error('Error getting user pet by id:', error);
        throw error;
    }
};
