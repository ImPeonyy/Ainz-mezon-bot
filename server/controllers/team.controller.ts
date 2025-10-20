import { BOT_ID, EInteractiveMessageType, ENormalStatus, MAX_LENGTH } from '@/constants';
import { prisma } from '@/lib/db';
import {
    addPetToTeam,
    fillTeamMembers,
    getTeam,
    getTeamForCalcCP,
    getUserPets,
    getUserPetsByRarityAndLevel,
    updatePetPosition,
    updateTeamCombatPower,
    updateTeamName
} from '@/services';
import {
    calculateTeamCP,
    findDuplicatePositions,
    getAddPetToTeamMessage,
    isValidPosition,
    teamInfoMessage,
    textMessage
} from '@/utils';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { interactiveMsgManager } from '@/managers';
import { MezonClient } from 'mezon-sdk';
import { User } from '@prisma/client';

const addPetToTeamMenu = interactiveMsgManager;

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
                    `🚨 Your team "${existingTeam.name}" is empty. \nPlz add some pets to your team! \n→ Usage: *ainz team add [position] [pet name]`
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

        if (teamName.length > MAX_LENGTH.TEAM_NAME) {
            await messageFetch.update(
                textMessage(`❌ Team name is too long! Maximum ${MAX_LENGTH.TEAM_NAME} characters allowed.`)
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
        await messageFetch.update(textMessage(`✅ Your team "${team.name}" has been updated successfully`));
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
    existingUser: User,
    message: Message,
    channel: any,
    client: MezonClient
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Getting pets for your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const existingTeam = await getTeam(existingUser.id);
        if (!existingTeam) {
            await messageFetch.update(
                textMessage(
                    "🚨 You don't have a team. \nPlz create one first! \n→ Usage: *ainz team create [team name]"
                )
            );
            return;
        }

        const userPet = await getUserPets(prisma, existingUser.id);
        messageFetch.update(getAddPetToTeamMessage(existingUser, userPet));

        const expireTimer = setTimeout(
            () => {
                addPetToTeamMenu.forceClose(
                    existingUser.id,
                    EInteractiveMessageType.ADD_PET_TO_TEAM,
                    '⏰ Add pet to team menu has expired and has been closed automatically!'
                );
            },
            5 * 60 * 1000
        );

        addPetToTeamMenu.register({
            userId: existingUser.id,
            message: messageFetch,
            type: EInteractiveMessageType.ADD_PET_TO_TEAM,
            expireTimer
        });

        client.onMessageButtonClicked(async (event: any) => {
            try {
                const { sender_id, user_id, button_id, extra_data } = event;
                if (
                    sender_id === BOT_ID &&
                    user_id === existingUser.id &&
                    messageFetch.id === event.message_id &&
                    addPetToTeamMenu.has(existingUser.id, EInteractiveMessageType.ADD_PET_TO_TEAM)
                ) {
                    if (button_id === ENormalStatus.CANCEL) {
                        addPetToTeamMenu.forceClose(
                            existingUser.id,
                            EInteractiveMessageType.ADD_PET_TO_TEAM,
                            '🚨 Add pet to team menu has been canceled!'
                        );
                        return;
                    }
                    if (button_id === ENormalStatus.EXECUTE) {
                        if (extra_data === '') {
                            await messageFetch.update(
                                getAddPetToTeamMessage(existingUser, userPet, false, `🚨 Invalid positions found!`)
                            );
                            return;
                        }
                        const parsedExtraData = JSON.parse(extra_data);
                        const duplicatePositions = findDuplicatePositions(parsedExtraData);

                        if (duplicatePositions.length > 0) {
                            await messageFetch.update(
                                getAddPetToTeamMessage(
                                    existingUser,
                                    userPet,
                                    false,
                                    `🚨 Duplicate positions found! ${duplicatePositions.join(' - ')}`
                                )
                            );
                            return;
                        }
                        await messageFetch.update(
                            getAddPetToTeamMessage(existingUser, userPet, true, '🔄 Adding pets to team...')
                        );
                        await prisma.$transaction(async (tx) => {
                            for (const [position, userPetId] of Object.entries(parsedExtraData)) {
                                await addPetToTeam(tx, existingTeam.id, Number(userPetId), Number(position));
                            }
                        });
                        const updatedTeam = await getTeam(existingUser.id);
                        addPetToTeamMenu.forceClose(existingUser.id, EInteractiveMessageType.ADD_PET_TO_TEAM);
                        setTimeout(async () => {
                            await messageFetch.update(teamInfoMessage(updatedTeam!));
                        }, 1000);
                        return;
                    }
                }
            } catch (error) {
                console.error('Error adding pet to team:', error);
                addPetToTeamMenu.forceClose(
                    existingUser.id,
                    EInteractiveMessageType.ADD_PET_TO_TEAM,
                    '❌ Internal server error'
                );
                return;
            }
        });

        const currentTeam = await getTeamForCalcCP(existingUser.id);
        if (currentTeam) {
            await updateTeamCombatPower(prisma, currentTeam.id, calculateTeamCP(currentTeam));
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
                textMessage(`✅ Successfully moved pet from position ${pos1} to position ${pos2}!`)
            );
            return;
        }

        const tempPos = 0;
        await updatePetPosition(pet1.id, tempPos);
        await updatePetPosition(pet2.id, pos1);
        await updatePetPosition(pet1.id, pos2);

        await messageFetch.update(
            textMessage(`✅ Successfully swapped pets between position ${pos1} and position ${pos2}!`)
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

export const fillTeamController = async (userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Filling your team...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const userPets = await getUserPetsByRarityAndLevel(userId);
        const team = await getTeam(userId);
        if (!team) {
            await messageFetch.update(textMessage("🚨 You don't have a team."));
            return;
        }
        const filledTeam = await fillTeamMembers(
            prisma,
            team.id,
            userPets.map((pet) => pet.id)
        );
        await messageFetch.update(teamInfoMessage(filledTeam));
        const currentTeam = await getTeamForCalcCP(userId);
        if (currentTeam) {
            await updateTeamCombatPower(prisma, currentTeam.id, calculateTeamCP(currentTeam));
        }
    } catch (error) {
        console.error('Error filling team:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
