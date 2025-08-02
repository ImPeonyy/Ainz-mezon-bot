import { ACTIONS, COMMANDS } from '@/constants/Constant';
import {
    createUserController,
    getUserController,
    updateUserController
} from './user.controller';
import { embedMessage, getActionMessage } from '@/utils/message.util';
import { getActionGif, getMeme } from '@/services/misc.service';

import { EActionType } from '@/constants/Enum';
import { textMessage } from '@/utils/message.util';

export const getActionController = async (event: any, action: string) => {
    try {
        const { sender_id, display_name, avatar } = event;

        if (
            Object.keys(COMMANDS).includes(action) ||
            Object.keys(ACTIONS).includes(action)
        ) {
            if (action === COMMANDS.init) {
                const createUserPayload = await createUserController(
                    display_name,
                    sender_id,
                    avatar
                );
                return createUserPayload;
            }

            if (action === COMMANDS.info) {
                const getUserPayload = await getUserController(sender_id);
                return getUserPayload;
            }

            if (action === COMMANDS.update) {
                const updateUserPayload = await updateUserController(
                    display_name,
                    sender_id,
                    avatar
                );
                return updateUserPayload;
            }

            if (action === COMMANDS.meme) {
                const memePayload = await getMemeController();
                return memePayload;
            }

            if (Object.keys(ACTIONS).includes(action)) {
                const actor = display_name;
                const target =
                    event.references?.[0]?.message_sender_display_name;
                const actionGifPayload = await getActionGifController(
                    actor,
                    action,
                    target
                );
                return actionGifPayload;
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

export const getActionGifController = async (
    actor: string,
    actionType: string,
    target?: string
) => {
    try {
        if (!actionType || !Object.keys(ACTIONS).includes(actionType)) {
            return textMessage('Invalid action type');
        }

        const action = ACTIONS[actionType];

        // Kiểm tra logic cho từng loại action
        if (action.type === EActionType.Interactive && !target) {
            return textMessage('Target not found for interactive action');
        }

        if (action.type === EActionType.Flexible && !target) {
            // Flexible actions có thể không cần target
            const actionGif = await getActionGif(actionType);

            if (
                !actionGif ||
                !actionGif.results ||
                actionGif.results.length === 0
            ) {
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

        // Cho Interactive actions hoặc Flexible actions có target
        const actionGif = await getActionGif(actionType);

        if (
            !actionGif ||
            !actionGif.results ||
            actionGif.results.length === 0
        ) {
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
