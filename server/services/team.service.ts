import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

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

export const addPetToTeam = async (teamId: number, petId: number, pos: number) => {
    try {
        return prisma.teamMember.create({
            data: {
                team_id: teamId,
                user_pet_id: petId,
                position: pos
            }
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

export const getRandomTeamForBattle = async (currentUserId: string) => {
    try {
        const teams = await prisma.team.findMany({
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

export const updateTeamMember = async (
    where: Prisma.TeamMemberWhereUniqueInput,
    data: Prisma.TeamMemberUncheckedUpdateInput
) => {
    try {
        return prisma.teamMember.update({
            where,
            data
        });
    } catch (error) {
        console.error('Error updating team member:', error);
        throw error;
    }
};
