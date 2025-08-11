import { prisma } from '@/lib/db';

export const getRarities = async () => {
    try {
        return await prisma.rarity.findMany();
    } catch (error) {
        console.error('Error getting rarities:', error);
        throw error;
    }
};
