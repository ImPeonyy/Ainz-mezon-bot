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
                    },
                }
            }
        });
    } catch (error) {
        console.error('Error getting team:', error);
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

export const updateTeam = async (name: string, userId: string) => {
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

export const deleteTeam = async (userId: string) => {
    try {
        return prisma.team.delete({
            where: {
                user_id: userId
            }
        });
    } catch (error) {
        console.error('Error deleting team:', error);
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
}

export const updatePos = async (teamMemberId: number, pos: number) => {
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
}

export const updatePet = async (petId: number, pos: number, userId: string) => {
    try {
        return prisma.teamMember.update({
            where: {
                user_id: userId
            },
            data: {
                user_pet_id: petId,
                position: pos
            }
        });
    } catch (error) {
        console.error('Error updating pet position:', error);
        throw error;
    }
}
