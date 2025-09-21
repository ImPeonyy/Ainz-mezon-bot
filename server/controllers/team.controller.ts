import {
    addPetToTeam,
    getPet,
    getTeam,
    getTeamForCalcCP,
    getUserPetByPetName,
    updatePetPosition,
    updateTeamCombatPower,
    updateTeamMember,
    updateTeamName
} from '@/services';
import { calculateTeamCP, isValidPosition, teamInfoMessage, textMessage } from '@/utils';

import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';

export const getTeamController = async (userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Searching for your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(
                textMessage(
                    `🚨 You don't have a team. \nPlz create one first! \n→ Usage: *ainz team create [team name]`
                )
            );
            return;
        }

        if (!existingTeam.members.length) {
            await messageFetch.update(
                textMessage(
                    `🚨 Your team "${existingTeam.name}" is empty. \nPlz add some pets to your team! \n→ Usage: *ainz team add [pos] [pet name]`
                )
            );
            return;
        }

        await messageFetch.update(teamInfoMessage(existingTeam));
    } catch (error: any) {
        console.error('Error getting team:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const updateTeamController = async (teamName: string, userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Updating your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (!teamName) {
            await messageFetch.update(
                textMessage('❓ Plz provide a team name! \n→ Usage: *ainz team update [team name]')
            );
            return;
        }

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(
                textMessage(
                    "🚨 You don't have a team. \nPlz create one first! \n→ Usage: *ainz team create [team name]"
                )
            );
            return;
        }

        const team = await updateTeamName(teamName, userId);
        await messageFetch.update(
            textMessage(
                `✅ Your team "${team.name}" has been updated successfully! \nPlz add pets to start fighting! \n→ Usage: *ainz team add [pos] [pet name]`
            )
        );
    } catch (error) {
        console.error('Error updating team:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const addPetToTeamController = async (
    pos: number,
    petName: string,
    userId: string,
    message: Message,
    channel: any
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Adding pet to your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (!pos) {
            await messageFetch.update(
                textMessage('❓ Plz provide a position! \n→ Usage: *ainz team add [pos] [pet name]')
            );
            return;
        }

        if (!petName) {
            await messageFetch.update(
                textMessage('❓ Plz provide a pet name! \n→ Usage: *ainz team add [pos] [pet name]')
            );
            return;
        }

        if (!isValidPosition(pos)) {
            await messageFetch.update(
                textMessage('🚨 Position must be 1, 2 or 3! \n→ Usage: *ainz team add [pos] [pet name]')
            );
            return;
        }

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(
                textMessage(
                    "🚨 You don't have a team. \nPlz create one first! \n→ Usage: *ainz team create [team name]"
                )
            );
            return;
        }

        const capitalizedPetName = petName
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const pet = await getPet(petName);
        if (!pet) {
            await messageFetch.update(
                textMessage(
                    `🚨 Pet "${capitalizedPetName}" is not found! \nPlz choose another pet! \n→ Usage: *ainz team add [pos] [pet name]`
                )
            );
            return;
        }

        const userPet = await getUserPetByPetName(userId, petName);
        if (!userPet) {
            await messageFetch.update(
                textMessage(
                    `🚨 You don't own a pet "${capitalizedPetName}"! \nPlz add this pet to your bag first! \n→ Usage: *ainz hunt to catch more pets"`
                )
            );
            return;
        }

        const isExistingPet = existingTeam.members.some(
            (member) => member.userPet.pet.name.toLowerCase() === petName.toLowerCase()
        );
        if (isExistingPet) {
            await messageFetch.update(
                textMessage(`🚨 Pet "${capitalizedPetName}" is already in your team. \nPlz choose another pet!`)
            );
            return;
        }

        const existingPosition = existingTeam.members.find((member) => member.position === pos);
        if (existingPosition) {
            await updateTeamMember({ id: existingPosition.id }, { user_pet_id: userPet.id });
            await messageFetch.update(
                textMessage(`🔄 Successfully moved pet "${capitalizedPetName}" to position ${pos}!`)
            );
            return;
        }

        await addPetToTeam(existingTeam.id, userPet.id, pos);
        await messageFetch.update(textMessage(`✅ Successfully added pet "${capitalizedPetName}" to your team!`));
        const currentTeam = await getTeamForCalcCP(userId);
        if (currentTeam) {
            await updateTeamCombatPower(currentTeam.id, calculateTeamCP(currentTeam));
        }
    } catch (error) {
        console.error('Error adding pet to team:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const swapPetInTeamController = async (
    pos1: number,
    pos2: number,
    userId: string,
    message: Message,
    channel: any
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Swapping pet in your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (!pos1 || !pos2) {
            await messageFetch.update(
                textMessage('❓ Plz provide two positions! \n Usage: *ainz team swap [pos1] [pos2]')
            );
            return;
        }

        if (!isValidPosition(pos1) || !isValidPosition(pos2)) {
            await messageFetch.update(
                textMessage('🚨 Positions must be 1, 2, or 3! \n Usage: *ainz team swap [pos1] [pos2]')
            );
            return;
        }

        if (pos1 === pos2) {
            await messageFetch.update(
                textMessage('🚨 Cannot swap the same position! \n Usage: *ainz team swap [pos1] [pos2]')
            );
            return;
        }

        const existingTeam = await getTeam(userId);
        if (!existingTeam) {
            await messageFetch.update(
                textMessage(
                    "🚨 You don't have a team. \nPlz create one first! \n→ Usage: *ainz team create [team name]"
                )
            );
            return;
        }

        const pet1 = existingTeam.members.find((member) => member.position === pos1);
        const pet2 = existingTeam.members.find((member) => member.position === pos2);

        if (!pet1) {
            await messageFetch.update(
                textMessage(
                    `🚨 Position ${pos1} is empty! \nPlz choose another position! \n→ Usage: *ainz team swap [pos1] [pos2]`
                )
            );
            return;
        }

        if (!pet2) {
            await updatePetPosition(pet1.id, pos2);
            await messageFetch.update(
                textMessage(
                    `🔄 Successfully moved pet from position ${pos1} to position ${pos2}! \nPlz add pets to start fighting! \n→ Usage: *ainz team add [pos] [pet name]`
                )
            );
            return;
        }

        const tempPos = 0;
        await updatePetPosition(pet1.id, tempPos);
        await updatePetPosition(pet2.id, pos1);
        await updatePetPosition(pet1.id, pos2);

        await messageFetch.update(
            textMessage(
                `🔄 Successfully swapped pets between position ${pos1} and position ${pos2}! \nPlz add pets to start fighting! \n→ Usage: *ainz team add [pos] [pet name]`
            )
        );
    } catch (error) {
        console.error('Error swapping pet in team:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
