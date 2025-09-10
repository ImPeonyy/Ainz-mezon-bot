import { prisma } from '@/lib/db';
import { Prisma, PrismaClient } from '@prisma/client';

export const getPets = () => {
    try {
        return prisma.pet.findMany({
            include: {
                rarity: true
            }
        });
    } catch (error) {
        console.error('Error getting pets:', error);
        throw error;
    }
};

export const getPetDetail = async (petName: string) => {
    try {
        return prisma.pet.findFirst({
            where: {
                name: {
                    equals: petName,
                    mode: 'insensitive'
                }
            },
            include: {
                statistic: true,
                rarity: true,
                autoAttack: true,
                passiveSkill: true,
                activeSkill: true
            }
        });
    } catch (error) {
        console.error('Error getting pets:', error);
        throw error;
    }
};

export const getUserPetDetail = async (petName: string, userId: string) => {
    try {
        return prisma.userPet.findFirst({
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
        console.error('Error updating user pet:', error);
        throw error;
    }
};
