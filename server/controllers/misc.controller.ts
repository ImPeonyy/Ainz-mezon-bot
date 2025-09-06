import { ACTIONS, COMMANDS } from '@/constants/Commands';
import {
    createUserController,
    dexController,
    getUserController,
    huntPetController,
    updateUserController,
    dailyController,
    battleController
} from '@/controllers';
import { embedMessage, getActorName, getTargetFromMention, textMessage, getHelpMessage } from '@/utils';
import { getActionGif, getMeme } from '@/services';
import { parseActionCommandTeam } from '@/utils/misc.util';
import { EActionType } from '@/constants/Enum';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { addPetToTeamController, createTeamController, deleteTeamController, getTeamController, swapPetInTeamController, updateTeamController } from './team.controller';

export const getActionController = async (
    event: any,
    action: string,
    channel: any,
    message: Message,
    mentionTarget?: string | null
) => {
    try {
        const { sender_id, display_name, avatar, clan_nick, references } = event;

        if (Object.keys(COMMANDS).includes(action) || Object.keys(ACTIONS).includes(action)) {
            if (action === COMMANDS.init) {
                const createUserPayload = await createUserController(display_name, sender_id, avatar);
                return createUserPayload;
            }

            if (action === COMMANDS.info) {
                const getUserPayload = await getUserController(sender_id);
                return getUserPayload;
            }

            if (action === COMMANDS.update) {
                const updateUserPayload = await updateUserController(display_name, sender_id, avatar);
                return updateUserPayload;
            }

            if (action === COMMANDS.meme) {
                const memePayload = await getMemeController();
                return memePayload;
            }

            if (Object.keys(ACTIONS).includes(action)) {
                const actor = getActorName(display_name, clan_nick);
                let target = references?.[0]?.message_sender_display_name;
                if (mentionTarget) {
                    target = getTargetFromMention(mentionTarget);
                }

                const actionGifPayload = await getActionGifController(actor, action, target);
                return actionGifPayload;
            }

            if (action === COMMANDS.hunt) {
                const huntPetPayload = await huntPetController(sender_id);
                return huntPetPayload;
            }

            if (action === COMMANDS.dex) {
                const petDetailPayload = await dexController(mentionTarget || '');
                return petDetailPayload;
            }

            if (action === COMMANDS.daily) {
                const dailyPayload = await dailyController(sender_id);
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
                const parseActionCommandTeamPayload = parseActionCommandTeam(mentionTarget || '');
                const { action, targetRaw } = parseActionCommandTeamPayload;

                switch (action) {
                    case 'info':
                        const getTeamPayload = await getTeamController(sender_id);
                        return getTeamPayload;
                    case 'create':
                        const createTeamPayload = await createTeamController(targetRaw || '', sender_id);
                        return createTeamPayload;
                    case 'update':
                        const updateTeamPayload = await updateTeamController(targetRaw || '', sender_id);
                        return updateTeamPayload;
                    case 'delete':
                        const deleteTeamPayload = await deleteTeamController(sender_id);
                        return deleteTeamPayload;
                    case 'add':
                        const [petId, pos] = targetRaw?.split(' ') || [];
                        const addPetToTeamPayload = await addPetToTeamController(Number(petId), Number(pos), sender_id);
                        return addPetToTeamPayload;
                    case 'swap':
                        const [pos1, pos2] = targetRaw?.split(' ') || [];
                        const swapPetInTeamPayload = await swapPetInTeamController(Number(pos1), Number(pos2), sender_id);
                        return swapPetInTeamPayload;
                    default:
                        return textMessage('Invalid command');
                }
            }
        }

        return textMessage('Invalid command');
    } catch (error) {
        console.error('Error in getActionController:', error);
        return textMessage('Internal server error');
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
        return textMessage('Internal server error');
    }
};

export const getActionGifController = async (actor: string, actionType: string, target?: string) => {
    try {
        if (!actionType || !Object.keys(ACTIONS).includes(actionType)) {
            return textMessage('Invalid action type');
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
        return textMessage('Internal server error');
    }
};

export const getHelpController = () => {
    try {
        const helpMessage = getHelpMessage();
        return helpMessage;
    } catch (error) {
        console.error('Error getting help message:', error);
        return textMessage('Internal server error');
    }
};
