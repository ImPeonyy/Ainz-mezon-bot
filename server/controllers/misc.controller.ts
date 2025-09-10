import { ACTIONS, COMMANDS } from '@/constants/Commands';
import {
    addPetToTeamController,
    createTeamController,
    deleteTeamController,
    getTeamController,
    swapPetInTeamController,
    updateTeamController
} from './team.controller';
import {
    battleController,
    createUserController,
    dailyController,
    dexController,
    getUserController,
    huntPetController,
    updateUserController
} from '@/controllers';
import { embedMessage, getActorName, getBagMessage, getHelpMessage, getTargetFromMention, textMessage } from '@/utils';
import { getActionGif, getMeme, getPets, getUserPets } from '@/services';

import { EActionType } from '@/constants/Enum';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { parseActionCommandTeam, parseRenameCommand } from '@/utils/misc.util';
import { prisma } from '@/lib/db';
import { renamePetController } from './pet.controller';

export const getActionController = async (
    event: any,
    action: string,
    channel: any,
    message: Message,
    targetRaw?: string | null
) => {
    try {
        const { sender_id, display_name, avatar, clan_nick, references, mentions } = event;

        if (Object.keys(COMMANDS).includes(action) || Object.keys(ACTIONS).includes(action)) {
            if (action === COMMANDS.init) {
                const createUserPayload = await createUserController(display_name, sender_id, avatar, message, channel);
                return createUserPayload;
            }

            if (action === COMMANDS.info) {
                const getUserPayload = await getUserController(sender_id, message, channel);
                return getUserPayload;
            }

            if (action === COMMANDS.update) {
                const updateUserPayload = await updateUserController(display_name, sender_id, avatar, message, channel);
                return updateUserPayload;
            }

            if (action === COMMANDS.meme) {
                const memePayload = await getMemeController();
                return memePayload;
            }

            if (Object.keys(ACTIONS).includes(action)) {
                const actor = getActorName(display_name, clan_nick);
                let target;
                if (targetRaw) {
                    target = getTargetFromMention(targetRaw);
                }
                target = references?.[0]?.message_sender_display_name;
                if (targetRaw && mentions.length > 0) {
                    target = getTargetFromMention(targetRaw);
                }
                const actionGifPayload = await getActionGifController(actor, action, target);
                return actionGifPayload;
            }

            if (action === COMMANDS.bag) {
                const bagPayload = await getBagController(sender_id, message, channel);
                return bagPayload;
            }

            if (action === COMMANDS.hunt) {
                const huntPetPayload = await huntPetController(sender_id, message, channel);
                return huntPetPayload;
            }

            if (action === COMMANDS.dex) {
                const petDetailPayload = await dexController(targetRaw || '');
                return petDetailPayload;
            }

            if (action === COMMANDS.daily) {
                const dailyPayload = await dailyController(sender_id, message, channel);
                return dailyPayload;
            }

            if (action === COMMANDS.battle) {
                const battlePayload = await battleController(channel, message);
                return battlePayload;
            }

            if (action === COMMANDS.help) {
                const helpPayload = await getHelpController();
                return helpPayload;
            }

            if (action === COMMANDS.team) {
                const parseActionCommandTeamPayload = parseActionCommandTeam(targetRaw || '');
                const { action, targetRaw: targetRawTeam } = parseActionCommandTeamPayload;

                switch (action) {
                    case 'info':
                        const getTeamPayload = await getTeamController(sender_id);
                        return getTeamPayload;
                    case 'create':
                        const createTeamPayload = await createTeamController(targetRawTeam || '', sender_id);
                        return createTeamPayload;
                    case 'update':
                        const updateTeamPayload = await updateTeamController(targetRawTeam || '', sender_id);
                        return updateTeamPayload;
                    case 'delete':
                        const deleteTeamPayload = await deleteTeamController(sender_id);
                        return deleteTeamPayload;
                    case 'add':
                        const [petId, pos] = targetRawTeam?.split(' ') || [];
                        const addPetToTeamPayload = await addPetToTeamController(Number(petId), Number(pos), sender_id);
                        return addPetToTeamPayload;
                    case 'swap':
                        const [pos1, pos2] = targetRawTeam?.split(' ') || [];
                        const swapPetInTeamPayload = await swapPetInTeamController(
                            Number(pos1),
                            Number(pos2),
                            sender_id
                        );
                        return swapPetInTeamPayload;
                    default:
                        return textMessage('❌ Invalid Team command');
                }
            }

            if (action === COMMANDS.rename) {
                const renameCommand = parseRenameCommand(targetRaw || '');
                if (renameCommand.error) {
                    return textMessage(renameCommand.error);
                }
                const { petName, nickname } = renameCommand;
                if (!petName) {
                    return textMessage('Please enter the pet name!');
                }
                if (!nickname) {
                    return textMessage('Please enter the nickname!');
                }

                await renamePetController(petName, nickname, sender_id, message, channel);
            }
        }

        return textMessage('❌ Invalid command');
    } catch (error) {
        console.error('Error in getActionController:', error);
        return textMessage('❌ Internal server error');
    }
};

export const getMemeController = async () => {
    try {
        const meme = await getMeme();

        if (!meme) {
            return textMessage('Meme not found');
        }

        const { title, url, postLink } = meme;

        return embedMessage({
            color: '#f3aab5',
            title: title,
            image: { url: url },
            url: postLink,
            fields: [
                {
                    name: 'Ups',
                    value: meme.ups.toString(),
                    inline: true
                },
                {
                    name: 'Author',
                    value: meme.author,
                    inline: true
                }
            ]
        });
    } catch (error) {
        console.log('Error getting meme:', error);
        return textMessage('❌ Internal server error');
    }
};

export const getActionGifController = async (actor: string, actionType: string, target?: string) => {
    try {
        if (!actionType || !Object.keys(ACTIONS).includes(actionType)) {
            return textMessage('❌ Invalid action type');
        }

        const action = ACTIONS[actionType];

        if (action.type === EActionType.INTERACTIVE && !target) {
            return textMessage('Target not found for interactive action');
        }

        if (action.type === EActionType.FLEXIBLE && !target) {
            const actionGif = await getActionGif(actionType);

            if (!actionGif || !actionGif.results || actionGif.results.length === 0) {
                return textMessage('Action gif not found, please try again');
            }

            const { url } = actionGif.results[0];

            return embedMessage({
                color: '#f3aab5',
                title: `${action.getMessage(actor)}`,
                image: { url: url },
                fields: [
                    {
                        name: 'Anime',
                        value: actionGif.results[0].anime_name,
                        inline: true
                    }
                ]
            });
        }

        const actionGif = await getActionGif(actionType);

        if (!actionGif || !actionGif.results || actionGif.results.length === 0) {
            return textMessage('Action gif not found, please try again');
        }

        const { url } = actionGif.results[0];

        return embedMessage({
            color: '#f3aab5',
            title: `${action.getMessage(actor, target)}`,
            image: { url: url },
            fields: [
                {
                    name: 'Anime',
                    value: actionGif.results[0].anime_name,
                    inline: true
                }
            ]
        });
    } catch (error) {
        console.error('Error getting action gif:', error);
        return textMessage('❌ Internal server error');
    }
};

export const getHelpController = () => {
    try {
        const helpMessage = getHelpMessage();
        return helpMessage;
    } catch (error) {
        console.error('Error getting help message:', error);
        return textMessage('❌ Internal server error');
    }
};

export const getBagController = async (sender_id: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Looking inside your bag for your pets... please wait!'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const pets = await getPets();
        const bag = await getUserPets(prisma, sender_id);
        const bagMessage = getBagMessage(pets, bag);
        await messageFetch.update(bagMessage);
    } catch (error) {
        console.error('Error getting bag:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
