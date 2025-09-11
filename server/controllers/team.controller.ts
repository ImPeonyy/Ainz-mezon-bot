import { getUserPetByPetName } from "@/services/pet.service";
import { addPetToTeam, createTeam, deleteTeam, getTeam, getTeamByName, updatePos, updateTeam } from "@/services/team.service";
import { textMessage } from "@/utils";
import { teamInfoMessage } from "@/utils/message.util";
import { isValidPosition } from "@/utils/team.util";

export const getTeamController = async (userId: string) => {
    try {
        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            return textMessage(`You don't have a team. Please create one first!`);
        }
        if (!existingTeam.members.length) {
            return textMessage(`Your team "${existingTeam.name}" is empty. Please add some pets to your team!`);
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

        const duplicateTeam = await getTeamByName(teamName);
        if (duplicateTeam) {
            return textMessage(`Team name "${teamName}" is already taken. Please choose a different name!`);
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

export const addPetToTeamController = async (pos: number, petName: string, userId: string) => {
    try {
        if (!petName) {
            return textMessage(`Please provide a pet name!`);
        }

        if (!pos) {
            return textMessage(`Please provide a position!`);
        }

        if (!isValidPosition(pos)) {
            return textMessage(`Position must be 1, 2 or 3!`);
        }

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            return textMessage(`You don't have a team. Please create one first!`);
        }

        const capitalizedPetName = petName.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        const userPet = await getUserPetByPetName(userId, petName);
        if (!userPet) {
            return textMessage(`You don't own a pet "${capitalizedPetName}"!`);
        }

        if (existingTeam.members.some(member => member.userPet.pet.name === petName)) {
            return textMessage(`Pet "${capitalizedPetName}" is already in your team. Please choose another pet!`);
        }
         
        await addPetToTeam(existingTeam.id, userPet.id, pos);
        return textMessage(`Pet "${capitalizedPetName}" has been added to your team successfully!`);
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

        if (!isValidPosition(pos1) || !isValidPosition(pos2)) {
            return textMessage(`Positions must be 1, 2, or 3!`);
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
            await updatePos(pet1.id, pos2);
            return textMessage(`Successfully moved pet from position ${pos1} to position ${pos2}!`);
        }

        await updatePos(pet1.id, pos2);
        await updatePos(pet2.id, pos1);

        return textMessage(`Successfully swapped pets between position ${pos1} and position ${pos2}!`);
    } catch (error) {
        console.error('Error swapping pet in team:', error);
        throw error;
    }
}