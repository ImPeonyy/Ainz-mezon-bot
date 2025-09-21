import { prisma } from '@/lib/db';
import { getUserLevelFromExp } from '@/utils';
import { Prisma, PrismaClient, User } from '@prisma/client';

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

export const upsertLeaderBoard = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    user: User,
    isWin: boolean
) => {
    try {
        return prismaClient.leaderBoard.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
                wins: isWin ? 1 : 0,
                losses: isWin ? 0 : 1
            },
            update: {
                wins: isWin ? { increment: 1 } : 0,
                losses: isWin ? 0 : { increment: 1 }
            }
        });
    } catch (error) {
        console.error('Error updating leader board:', error);
        throw error;
    }
};

export const getMyLeaderBoard = async (userId: string) => {
    try {
        return prisma.leaderBoard.findUnique({
            where: { userId },
            include: { user: true }
        });
    } catch (error) {
        console.error('Error getting leader board:', error);
        throw error;
    }
};

export const getLevelLeaderBoard = async () => {
    try {
        return prisma.leaderBoard.findMany({
            orderBy: { level: 'desc' },
            take: 10,
            include: { user: true }
        });
    } catch (error) {
        console.error('Error getting level leader board:', error);
        throw error;
    }
};

export const getCombatPowerLeaderBoard = async () => {
    try {
        return prisma.leaderBoard.findMany({
            orderBy: { combat_power: 'desc' },
            take: 10,
            include: { user: true }
        });
    } catch (error) {
        console.error('Error getting combat power leader board:', error);
        throw error;
    }
};

export const getWinsLeaderBoard = async () => {
    try {
        return prisma.leaderBoard.findMany({
            orderBy: { wins: 'desc' },
            take: 10,
            include: { user: true }
        });
    } catch (error) {
        console.error('Error getting wins leader board:', error);
        throw error;
    }
};

export const getLossesLeaderBoard = async () => {
    try {
        return prisma.leaderBoard.findMany({
            orderBy: { losses: 'desc' },
            take: 10,
            include: { user: true }
        });
    } catch (error) {
        console.error('Error getting losses leader board:', error);
        throw error;
    }
};

export const getUserRank = async (userId: string, field: 'level' | 'combat_power' | 'wins' | 'losses') => {
    try {
        const userLeaderBoard = await prisma.leaderBoard.findUnique({
            where: { userId }
        });

        if (!userLeaderBoard) return null;

        const rank = await prisma.leaderBoard.count({
            where: {
                [field]: { gt: userLeaderBoard[field] }
            }
        });

        return rank + 1;
    } catch (error) {
        console.error('Error getting user rank:', error);
        throw error;
    }
};

export const autoUpdateLeaderBoard = async () => {
    try {
        console.log('🔄 Start updating Leader Board...');

        const users = await prisma.user.findMany({
            include: {
                leaderBoard: true,
                team: true
            }
        });

        let updatedCount = 0;
        let createdCount = 0;

        for (const user of users) {
            try {
                const userLevel = getUserLevelFromExp(user.exp);
                const combatPower = user.team?.combat_power;

                if (user.leaderBoard) {
                    await prisma.leaderBoard.update({
                        where: { userId: user.id },
                        data: {
                            level: userLevel,
                            combat_power: combatPower
                        }
                    });
                    updatedCount++;
                } else {
                    await prisma.leaderBoard.create({
                        data: {
                            userId: user.id,
                            level: userLevel,
                            combat_power: combatPower,
                            wins: 0,
                            losses: 0
                        }
                    });
                    createdCount++;
                }
            } catch (error) {
                console.error(`❌ Error updating user ${user.username}:`, error);
            }
        }

        console.log(`🎉 Finished updating Leader Board!`);
        console.log(`📊 Total users: ${users.length}`);
        console.log(`🔄 Updated: ${updatedCount} user`);
        console.log(`🆕 Created: ${createdCount} user`);

        return {
            success: true,
            updated: updatedCount,
            created: createdCount,
            total: users.length
        };
    } catch (error) {
        console.error('❌ Error updating Leader Board:', error);
        throw error;
    }
};
