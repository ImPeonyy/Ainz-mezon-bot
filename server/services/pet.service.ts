import { prisma } from '@/lib/db';

export const getPets = async () => {
    try {
        return await prisma.pet.findMany();
    } catch (error) {
        console.error('Error getting pets:', error);
        throw error;
    }
};
