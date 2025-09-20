import { createProfileCard, expToUserLevel, getUserLevelFromExp, textMessage } from '@/utils';
import { createLeaderBoard, createTeam, createUser, getUser, updateUser, uploadImageToCloudinary } from '@/services';

import { AINZ_DEFAULT_AVATAR, CLOUDINARY_PROFILE_FOLDER } from '@/constants';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

export const getUserController = async (existingUser: Prisma.UserGetPayload<{ include: { team: true } }>, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Retrieving user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const currentLevel = getUserLevelFromExp(existingUser?.exp || 0);

        const imageBuffer = await createProfileCard({
            username: existingUser?.username || '',
            level: currentLevel,
            z_coin: existingUser?.z_coin || 0,
            currentXP: existingUser?.exp || 0,
            nextLevelXP: expToUserLevel(currentLevel + 1),
            avatar: existingUser?.avatar || '',
            combat_power: existingUser?.team?.combat_power || 0
        });

        const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_PROFILE_FOLDER);

        await messageFetch.update(
            {},
            [],
            [
                {
                    filename: 'attachment.png',
                    filetype: 'image/png',
                    url: image.secure_url
                }
            ]
        );
    } catch (error) {
        console.error('Error getting user:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const createUserController = async (
    display_name: string,
    username: string,
    mezon_id: string,
    avatar: string,
    message: Message,
    channel: any
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Initializing user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const existingUser = await getUser(mezon_id);

        if (existingUser) {
            await messageFetch.update(textMessage('User already exists'));
            return;
        }

        const user = await createUser(prisma, { username: display_name, id: mezon_id, avatar });
        await createTeam(username, user.id);
        await createLeaderBoard(user.id);

        const currentLevel = getUserLevelFromExp(user?.exp || 0);

        const imageBuffer = await createProfileCard({
            username: user?.username || '',
            level: currentLevel,
            z_coin: user?.z_coin || 0,
            currentXP: user?.exp || 0,
            nextLevelXP: expToUserLevel(currentLevel + 1),
            avatar: user?.avatar || AINZ_DEFAULT_AVATAR,
            combat_power: 0
        });

        const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_PROFILE_FOLDER);

        await messageFetch.update(
            {},
            [],
            [
                {
                    filename: 'attachment.png',
                    filetype: 'image/png',
                    url: image.secure_url
                }
            ]
        );
    } catch (error) {
        console.error('Error creating user:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const updateUserController = async (
    username: string,
    existingUser: Prisma.UserGetPayload<{ include: { team: true } }>,
    avatar: string,
    message: Message,
    channel: any,
    targetRaw?: string | null
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Updating user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        let usernameUpdate;
        if (targetRaw) {
            usernameUpdate = targetRaw;
        } else {
            usernameUpdate = username;
        }

        const user = await updateUser(
            prisma,
            {
                id: existingUser?.id
            },
            { username: usernameUpdate, avatar }
        );

        const currentLevel = getUserLevelFromExp(user?.exp || 0);

        const imageBuffer = await createProfileCard({
            username: user?.username || '',
            level: currentLevel,
            z_coin: user?.z_coin || 0,
            currentXP: user?.exp || 0,
            nextLevelXP: expToUserLevel(currentLevel + 1),
            avatar: user?.avatar || '',
            combat_power: existingUser?.team?.combat_power || 0
        });

        const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_PROFILE_FOLDER);

        await messageFetch.update(
            {},
            [],
            [
                {
                    filename: 'attachment.png',
                    filetype: 'image/png',
                    url: image.secure_url
                }
            ]
        );
    } catch (error) {
        console.error('Error updating user:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
