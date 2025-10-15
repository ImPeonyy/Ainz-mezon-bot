import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { PrismaClient } from '@prisma/client/extension';

export const getTeam = async (userId: string) => {
    try {
        return prisma.team.findFirst({
            where: {
                user_id: userId
            },
            include: {
                members: {
                    include: {
                        userPet: {
                            include: {
                                pet: true
                            }
                        }
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error getting team:', error);
        throw error;
    }
};

export const getTeamByName = async (name: string) => {
    try {
        return prisma.team.findFirst({
            where: {
                name: name
            }
        });
    } catch (error) {
        console.error('Error getting team by name:', error);
        throw error;
    }
};

export const createTeam = async (name: string, userId: string) => {
    try {
        return prisma.team.create({
            data: {
                name: name,
                user_id: userId
            }
        });
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
};

export const updateTeamName = async (name: string, userId: string) => {
    try {
        return prisma.team.update({
            where: {
                user_id: userId
            },
            data: {
                name: name
            }
        });
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
};

export const addPetToTeam = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    team_id: number,
    user_pet_id: number,
    position: number
) => {
    try {
        const petAtNewPos = await prismaClient.teamMember.findUnique({
            where: { team_id_position: { team_id, position } }
        });

        const currentPet = await prismaClient.teamMember.findFirst({
            where: { team_id, user_pet_id }
        });

        if (!currentPet) {
            if (petAtNewPos) {
                return prismaClient.teamMember.update({
                    where: { id: petAtNewPos.id },
                    data: { user_pet_id }
                });
            }

            return prismaClient.teamMember.create({
                data: { team_id, user_pet_id, position }
            });
        }

        if (currentPet.position === position) {
            return currentPet;
        }

        if (petAtNewPos) {
            await prismaClient.teamMember.update({
                where: { id: petAtNewPos.id },
                data: { position: -1 }
            });

            await prismaClient.teamMember.update({
                where: { id: currentPet.id },
                data: { position }
            });

            await prismaClient.teamMember.update({
                where: { id: petAtNewPos.id },
                data: { position: currentPet.position }
            });

            return;
        }

        return prismaClient.teamMember.update({
            where: { id: currentPet.id },
            data: { position }
        });
    } catch (error) {
        console.error('Error adding pet to team:', error);
        throw error;
    }
};

export const updatePetPosition = async (teamMemberId: number, pos: number) => {
    try {
        return prisma.teamMember.update({
            where: {
                id: teamMemberId
            },
            data: {
                position: pos
            }
        });
    } catch (error) {
        console.error('Error updating pet position:', error);
        throw error;
    }
};

export const getTeamForBattle = async (userId: string) => {
    try {
        return prisma.team.findFirst({
            where: {
                user_id: userId
            },
            include: {
                members: {
                    include: {
                        userPet: {
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
                            }
                        }
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error getting team:', error);
        throw error;
    }
};

export const getRandomTeamForBattle = async (currentUserId: string, currentUserCombatPower: number) => {
    try {
        let teams;
        teams = await prisma.team.findMany({
            where: {
                user_id: {
                    not: currentUserId
                },
                combat_power: {
                    lte: currentUserCombatPower + 10000,
                    gte: currentUserCombatPower - 10000
                }
            },
            include: {
                members: {
                    include: {
                        userPet: {
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
                            }
                        }
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        });

        if (teams.length === 0) {
            teams = await prisma.team.findMany({
                where: {
                    user_id: {
                        not: currentUserId
                    }
                },
                include: {
                    members: {
                        include: {
                            userPet: {
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
                                }
                            }
                        },
                        orderBy: {
                            position: 'asc'
                        }
                    }
                }
            });
        }

        const validTeams = teams.filter((team) => team.members.length === 3);

        if (validTeams.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * validTeams.length);
        return validTeams[randomIndex];
    } catch (error) {
        console.error('Error getting team:', error);
        throw error;
    }
};

export const getTeamForCalcCP = async (userId: string) => {
    try {
        return prisma.team.findUnique({
            where: { user_id: userId },
            include: {
                members: { include: { userPet: { include: { pet: { include: { statistic: true, rarity: true } } } } } }
            }
        });
    } catch (error) {
        console.error('Error getting team for calc cp:', error);
        throw error;
    }
};

export const updateTeamCombatPower = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    teamId: number,
    combatPower: number
) => {
    try {
        return prismaClient.team.update({
            where: { id: teamId },
            data: { combat_power: combatPower }
        });
    } catch (error) {
        console.error('Error updating team combat power:', error);
        throw error;
    }
};

export const fillTeamMembers = async (
    prismaClient: PrismaClient | Prisma.TransactionClient,
    teamId: number,
    userPetIds: number[]
) => {
    try {
        return await prismaClient.$transaction(async (tx) => {
            const currentMembers = await tx.teamMember.findMany({
                where: { team_id: teamId },
                select: { position: true, user_pet_id: true }
            });

            const occupiedPositions = currentMembers.map((m) => m.position);
            const existingPetIds = currentMembers.map((m) => m.user_pet_id);

            const allPositions = [1, 2, 3];
            const missingPositions = allPositions.filter((pos) => !occupiedPositions.includes(pos));

            if (missingPositions.length === 0) {
                await tx.teamMember.findMany({
                    where: { team_id: teamId },
                    include: {
                        userPet: {
                            include: { pet: true }
                        }
                    },
                    orderBy: { position: 'asc' }
                });
            }

            const validPetIds = userPetIds.filter((id) => !existingPetIds.includes(id));

            const membersToAdd: Prisma.TeamMemberCreateManyInput[] = [];
            for (let i = 0; i < Math.min(missingPositions.length, validPetIds.length); i++) {
                const member = {
                    team_id: teamId,
                    user_pet_id: validPetIds[i],
                    position: missingPositions[i]
                };
                membersToAdd.push(member);
            }

            if (membersToAdd.length > 0) {
                await tx.teamMember.createMany({ data: membersToAdd });
            }

            const updatedTeam = await tx.team.findUnique({
                where: { id: teamId },
                include: {
                    members: {
                        include: {
                            userPet: {
                                include: {
                                    pet: true
                                }
                            }
                        },
                        orderBy: { position: 'asc' }
                    }
                }
            });

            return updatedTeam;
        });
    } catch (error) {
        console.error('❌ Error filling team members:', error);
        throw error;
    }
};
