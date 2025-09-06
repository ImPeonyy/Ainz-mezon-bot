import { addPetToTeam, createTeam, deleteTeam, getPetFromTeam, getTeam, updatePos, updateTeam } from "@/services/team.service";
import { textMessage } from "@/utils";
import { teamInfoMessage } from "@/utils/message.util";

export const getTeamController = async (userId: string) => {
    try {
        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            return textMessage(`You don't have a team. Please create one first!`);
        }
        return teamInfoMessage(existingTeam.members);
    } catch (error: any) {
        console.error('Error getting team:', error);
        throw error;
    }
}

export const createTeamController = async (teamName: string, userId: string) => {
    try {
        if (!teamName) return textMessage('Please provide a team name!');
        
        const existingTeam = await getTeam(userId);
        if (existingTeam) {
            return textMessage('You already have a team. Please delete it first!');
        }
        const team = await createTeam(teamName, userId);
        return textMessage(`Your team "${team.name}" has been created successfully. Please add pets to start fighting!`);
    } catch (error: any) {
        console.error('Error creating team:', error);
        throw error;
    }
}

export const updateTeamController = async (teamName: string, userId: string) => {
    try {
        if (!teamName) return textMessage('Please provide a team name!');
        
        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            return textMessage(`You don't have a team. Please create one first!`);
        }
        const team = await updateTeam(teamName, userId);
        return textMessage(`Your team "${team.name}" has been updated successfully!`);
    } catch (error) {
        console.error('Error updating team:', error);
        throw error;
    }
}

export const deleteTeamController = async (userId: string) => {
    try {
        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            return textMessage(`You don't have a team. Please create one first!`);
        }
        const team = await deleteTeam(userId);
        return textMessage(`Your team "${team.name}" has been deleted successfully!`);
    } catch (error) {
        console.error('Error deleting team:', error);
        throw error;
    }
}

export const addPetToTeamController = async (petId: number, pos: number, userId: string) => {
    try {
        if (!petId || !pos) {
            return textMessage(`Please provide a pet ID and position!`);
        }
        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            return textMessage(`You don't have a team. Please create one first!`);
        }
        if (existingTeam.members.some(member => member.position === pos)) {
            return textMessage(`Position ${pos} is already occupied. Please choose another position!`);
        }
        if (existingTeam.members.some(member => member.user_pet_id === petId)) {
            return textMessage(`Pet "${petId}" is already in your team. Please choose another pet!`);
        }
        const pet = await addPetToTeam(existingTeam.id, petId, pos);
        return textMessage(`Pet "${pet.id}" has been added to your team successfully!`);
    } catch (error) {
        console.error('Error adding pet to team:', error);
        throw error;
    }
}

export const swapPetInTeamController = async (pos1: number, pos2: number, userId: string) => {
    try {
        if (!pos1 || !pos2) {
            return textMessage(`Please provide two positions!`);
        }
        
        if (pos1 === pos2) {
            return textMessage(`Cannot swap the same position!`);
        }

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            return textMessage(`You don't have a team. Please create one first!`);
        }

        const pet1 = existingTeam.members.find(member => member.position === pos1);
        const pet2 = existingTeam.members.find(member => member.position === pos2);

        if (!pet1) {
            return textMessage(`Position ${pos1} is empty!`);
        }

        if (!pet2) {
            await addPetToTeam(existingTeam.id, pet1.user_pet_id, pos2);
            return textMessage(`Successfully swapped pets between position ${pos1} and position ${pos2}!`);
        }

        await updatePos(pet1.id, pos2);
        await updatePos(pet2.id, pos1);

        return textMessage(`Successfully swapped pets between position ${pos1} and position ${pos2}!`);
    } catch (error) {
        console.error('Error swapping pet in team:', error);
        throw error;
    }
}