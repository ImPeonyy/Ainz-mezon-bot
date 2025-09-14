import { prisma } from '@/lib/db';

export const getPet = (petName: string) => {
    try {
        return prisma.pet.findFirst({
            where: {
                name: {
                    equals: petName,
                    mode: 'insensitive'
                }
            }
        });
    } catch (error) {
        console.error('Error getting pets:', error);
        throw error;
    }
};

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

export const getPetsByRarity = (rarity: string) => {
    try {
        return prisma.pet.findMany({
            include: {
                rarity: true
            },
            where: {
                rarity: {
                    name: {
                        equals: rarity,
                        mode: 'insensitive'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error getting pets by rarity:', error);
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
