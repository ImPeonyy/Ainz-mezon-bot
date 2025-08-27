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

import { EActionType } from '@/constants/Enum';

export const getActionController = async (event: any, action: string, mentionTarget?: string | null) => {
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
                const battlePayload = await battleController();
                return battlePayload;
            }

            if (action === COMMANDS.help) {
                const helpPayload = await getHelpController();
                return helpPayload;
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
