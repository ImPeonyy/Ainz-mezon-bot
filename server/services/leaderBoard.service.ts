import { prisma } from '@/lib/db';

export const createLeaderBoard = async (userId: string) => {
    try {
        return prisma.leaderBoard.create({
            data: { userId }
        });
    } catch (error) {
        console.error('Error creating leader board:', error);
        throw error;
    }
};
