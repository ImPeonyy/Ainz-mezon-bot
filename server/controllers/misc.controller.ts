import { ACTIONS, COMMANDS } from '@/constants/Commands';
import {
    battleController,
    createUserController,
    dailyController,
    dexController,
    getUserController,
    huntPetController,
    updateUserController,
    getTeamController,
    createTeamController,
    updateTeamController,
    addPetToTeamController,
    swapPetInTeamController,
    myDexController,
    renamePetController
} from '@/controllers';
import { embedMessage, getActorName, getBagMessage, getHelpMessage, getTargetFromMention, textMessage } from '@/utils';
import { getActionGif, getMeme, getPets, getUser, getUserPets } from '@/services';
import { EActionType } from '@/constants/Enum';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { parseActionCommandTeam, parseRenameCommand } from '@/utils/misc.util';
import { prisma } from '@/lib/db';
import { ERarity } from '@prisma/client';
import { getPetsByRarity } from '@/services/pet.service';
import { getUserPetsByRarity } from '@/services/userPet.service';
import { getBagMessageByRarity } from '@/utils/message.util';

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
            if (!display_name || !sender_id) {
                return textMessage('Error retrieving username or mezon id');
            }

            if (action === COMMANDS.init) {
                const createUserPayload = await createUserController(display_name, sender_id, avatar, message, channel);
                return createUserPayload;
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

            if (action === COMMANDS.dex) {
                if (!targetRaw) {
                    return textMessage('🚨 Missing pet name!\nUsage: *ainz dex "Pet Name"');
                }
                const petDetailPayload = await dexController(targetRaw || '', message, channel, sender_id);
                return petDetailPayload;
            }

            if (action === COMMANDS.help) {
                const helpPayload = await getHelpController();
                return helpPayload;
            }

            const existingUser = await getUser(sender_id);

            if (!existingUser) {
                return textMessage('🚨 User not found!\n→ Plz initialize your user first!\nUsage: *ainz init');
            }

            if (action === COMMANDS.info) {
                const getUserPayload = await getUserController(existingUser, message, channel);
                return getUserPayload;
            }

            if (action === COMMANDS.update) {
                const updateUserPayload = await updateUserController(
                    display_name,
                    existingUser,
                    avatar,
                    message,
                    channel
                );
                return updateUserPayload;
            }

            if (action === COMMANDS.bag) {
                const bagPayload = await getBagController(sender_id, message, channel, targetRaw);
                return bagPayload;
            }

            if (action === COMMANDS.hunt) {
                const huntPetPayload = await huntPetController(sender_id, message, channel);
                return huntPetPayload;
            }

            if (action === COMMANDS.mydex) {
                if (!targetRaw) {
                    return textMessage('🚨 Missing pet name!\nUsage: *ainz mydex "Pet Name"');
                }
                const petDetailPayload = await myDexController(targetRaw || '', sender_id, message, channel);
                return petDetailPayload;
            }

            if (action === COMMANDS.daily) {
                const dailyPayload = await dailyController(sender_id, message, channel);
                return dailyPayload;
            }

            if (action === COMMANDS.battle) {
                const targetId = mentions[0]?.user_id || references[0]?.message_sender_id;
                if(targetRaw && !targetId) {
                    return textMessage('🚨 Missing target!\nUsage: *ainz battle "@user" or reply user with *ainz battle');
                }
                const battlePayload = await battleController(existingUser, targetId, channel, message);
                return battlePayload;
            }

            if (action === COMMANDS.team) {
                const parseActionCommandTeamPayload = parseActionCommandTeam(targetRaw || '');
                const { action, targetRaw: targetRawTeam } = parseActionCommandTeamPayload;

                switch (action) {
                    case 'info':
                        const getTeamPayload = await getTeamController(sender_id, message, channel);
                        return getTeamPayload;
                    case 'create':
                        const createTeamPayload = await createTeamController(targetRawTeam || '', sender_id, message, channel);
                        return createTeamPayload;
                    case 'update':
                        const updateTeamPayload = await updateTeamController(targetRawTeam || '', sender_id, message, channel);
                        return updateTeamPayload;
                    case 'add':
                        const parts = targetRawTeam?.split(' ') || [];
                        const pos = parts[0];
                        const name = parts.slice(1).join(' ');
                        const addPetToTeamPayload = await addPetToTeamController(Number(pos), name, sender_id, message, channel);
                        return addPetToTeamPayload;
                    case 'swap':
                        const [pos1, pos2] = targetRawTeam?.split(' ') || [];
                        const swapPetInTeamPayload = await swapPetInTeamController(
                            Number(pos1),
                            Number(pos2),
                            sender_id,
                            message,
                            channel
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
                    return textMessage('🚨 Missing pet name!\nUsage: *ainz rename "Pet Name" > "Nickname"');
                }
                if (!nickname) {
                    return textMessage('🚨 Missing nickname!\nUsage: *ainz rename "Pet Name" > "Nickname"');
                }

                await renamePetController(petName, nickname, sender_id, message, channel);
                return;
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
        console.error('Error getting meme:', error);
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
                return textMessage('Action gif not found. Plz try again!');
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
            return textMessage('Action gif not found. Plz try again!');
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

export const getBagController = async (
    sender_id: string,
    message: Message,
    channel: any,
    targetRaw?: string | null
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Looking inside your bag for your pets... Plz wait!'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (targetRaw) {
            if (Object.values(ERarity).some((v) => v.toLowerCase() === (targetRaw as string).toLowerCase())) {
                const pets = await getPetsByRarity(targetRaw as ERarity);
                const bag = await getUserPetsByRarity(prisma, sender_id, targetRaw as ERarity);
                const bagMessage = getBagMessageByRarity(pets, bag);
                await messageFetch.update(bagMessage);
                return;
            } else {
                messageFetch.update(textMessage('🚨 Invalid rarity!\nUsage: *ainz bag "Rarity"'));
                return;
            }
        }

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
