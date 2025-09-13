import { getPet, getUserPetByPetName } from "@/services/pet.service";
import { addPetToTeam, createTeam, getTeam, getTeamByName, updatePos, updateTeam } from "@/services/team.service";
import { textMessage } from "@/utils";
import { teamInfoMessage } from "@/utils/message.util";
import { isValidPosition } from "@/utils/team.util";
import { Message } from "mezon-sdk/dist/cjs/mezon-client/structures/Message";

export const getTeamController = async (userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Searching for your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(textMessage(`You don't have a team. \n→ Plz create one first! \nUsage: *ainz team create "team name"`));
            return;
        }
        if (!existingTeam.members.length) {
            await messageFetch.update(textMessage(`Your team "${existingTeam.name}" is empty. \n→ Plz add some pets to your team! \nUsage: *ainz team add "pos" "pet name"`));
            return;
        }
        await messageFetch.update(teamInfoMessage(existingTeam.members));
    } catch (error: any) {
        console.error('Error getting team:', error);
        throw error;
    }
}

export const createTeamController = async (teamName: string, userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Creating your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        
        if (!teamName) {
            await messageFetch.update(textMessage('Plz provide a team name! \n→ Usage: *ainz team create "team name"'));
            return;
        }
        
        const existingTeam = await getTeam(userId);
        if (existingTeam) {
            await messageFetch.update(textMessage('You already have a team! \n→ Plz use another name!'));
            return;
        }

        const duplicateTeam = await getTeamByName(teamName);
        if (duplicateTeam) {
            await messageFetch.update(textMessage(`Team name "${teamName}" is already taken. \n→ Plz choose a different name! \nUsage: *ainz team create "team name"`));
            return;
        }

        const team = await createTeam(teamName, userId);
        await messageFetch.update(textMessage(`Your team "${team.name}" has been created successfully. \n→ Plz add pets to start fighting! \nUsage: *ainz team add "pos" "pet name"`));
    } catch (error: any) {
        console.error('Error creating team:', error);
        throw error;
    }
}

export const updateTeamController = async (teamName: string, userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Updating your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        
        if (!teamName) {
            await messageFetch.update(textMessage('Plz provide a team name! \n→ Usage: *ainz team update "team name"'));
            return;
        }
        
        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(textMessage('You don\'t have a team. \n→ Plz create one first! \nUsage: *ainz team create "team name"'));
            return;
        }
        const team = await updateTeam(teamName, userId);
        await messageFetch.update(textMessage(`Your team "${team.name}" has been updated successfully! \n→ Plz add pets to start fighting! \nUsage: *ainz team add "pos" "pet name"`));
    } catch (error) {
        console.error('Error updating team:', error);
        throw error;
    }
}

export const addPetToTeamController = async (pos: number, petName: string, userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Adding pet to your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (!pos) {
            await messageFetch.update(textMessage('Plz provide a position! \n→ Usage: *ainz team add "pos" "pet name"'));
            return;
        }

        if (!petName) {
            await messageFetch.update(textMessage('Plz provide a pet name! \n→ Usage: *ainz team add "pos" "pet name"'));
            return;
        }

        if (!isValidPosition(pos)) {
            await messageFetch.update(textMessage('Position must be 1, 2 or 3! \n→ Usage: *ainz team add "pos" "pet name"'));
            return;
        }

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(textMessage('You don\'t have a team. \n→ Plz create one first! \nUsage: *ainz team create "team name"'));
            return;
        }

        if (existingTeam.members.length >= 3) {
            await messageFetch.update(textMessage('Your team is full. \n→ Plz remove a pet first! \nUsage: *ainz team remove "pos"'));
            return;
        }

        const capitalizedPetName = petName.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        const pet = await getPet(petName);
        if (!pet) {
            await messageFetch.update(textMessage(`Pet "${capitalizedPetName}" is not found! \n→ Plz choose another pet! \nUsage: *ainz team add "pos" "pet name"`));
            return;
        }

        const userPet = await getUserPetByPetName(userId, petName);
        if (!userPet) {
            await messageFetch.update(textMessage(`You don't own a pet "${capitalizedPetName}"! \n→ Plz add this pet to your bag first! \nUsage: *ainz hunt to catch more pets"`));
            return;
        }

        if (existingTeam.members.some(member => member.userPet.pet.name === petName)) {
            await messageFetch.update(textMessage(`Pet "${capitalizedPetName}" is already in your team. \n→ Plz choose another pet! \nUsage: *ainz team add "pos" "pet name"`));
            return;
        }
         
        await addPetToTeam(existingTeam.id, userPet.id, pos);
        await messageFetch.update(textMessage(`Pet "${capitalizedPetName}" has been added to your team successfully! \n→ Plz add pets to start fighting! \nUsage: *ainz team add "pos" "pet name"`));
    } catch (error) {
        console.error('Error adding pet to team:', error);
        throw error;
    }
}

export const swapPetInTeamController = async (pos1: number, pos2: number, userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Swapping pet in your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (!pos1 || !pos2) {
            await messageFetch.update(textMessage('Plz provide two positions! \n Usage: *ainz team swap "pos1" "pos2"'));
            return;
        }

        if (!isValidPosition(pos1) || !isValidPosition(pos2)) {
            await messageFetch.update(textMessage('Positions must be 1, 2, or 3! \n Usage: *ainz team swap "pos1" "pos2"'));
            return;
        }
        
        if (pos1 === pos2) {
            await messageFetch.update(textMessage('Cannot swap the same position! \n Usage: *ainz team swap "pos1" "pos2"'));
            return;
        }

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(textMessage('You don\'t have a team. \n→ Plz create one first! \nUsage: *ainz team create "team name"'));
            return;
        }

        const pet1 = existingTeam.members.find(member => member.position === pos1);
        const pet2 = existingTeam.members.find(member => member.position === pos2);

        if (!pet1) {
            await messageFetch.update(textMessage(`Position ${pos1} is empty! \n→ Plz choose another position! \nUsage: *ainz team swap "pos1" "pos2"`));
            return;
        }

        if (!pet2) {
            await updatePos(pet1.id, pos2);
            await messageFetch.update(textMessage(`Successfully moved pet from position ${pos1} to position ${pos2}! \n→ Plz add pets to start fighting! \nUsage: *ainz team add "pos" "pet name"`));
            return;
        }

        const tempPos = 0;
        await updatePos(pet1.id, tempPos);
        await updatePos(pet2.id, pos1);
        await updatePos(pet1.id, pos2);

        await messageFetch.update(textMessage(`Successfully swapped pets between position ${pos1} and position ${pos2}! \n→ Plz add pets to start fighting! \nUsage: *ainz team add "pos" "pet name"`));
    } catch (error) {
        console.error('Error swapping pet in team:', error);
        throw error;
    }
}