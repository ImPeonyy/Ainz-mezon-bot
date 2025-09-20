import { createProfileCard, expToUserLevel, textMessage } from '@/utils';
import { createTeam, createUser, getUser, updateUser, uploadImageToCloudinary } from '@/services';

import { AINZ_DEFAULT_AVATAR, CLOUDINARY_PROFILE_FOLDER } from '@/constants';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { User } from '@prisma/client';
import { prisma } from '@/lib/db';

export const getUserController = async (existingUser: User, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Retrieving user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const imageBuffer = await createProfileCard({
            username: existingUser?.username || '',
            level: existingUser?.level || 0,
            z_coin: existingUser?.z_coin || 0,
            currentXP: existingUser?.exp || 0,
            nextLevelXP: expToUserLevel(existingUser.level + 1) || 0,
            avatar: existingUser?.avatar || ''
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
        await createTeam(username, mezon_id);

        const imageBuffer = await createProfileCard({
            username: user?.username || '',
            level: user?.level || 0,
            z_coin: user?.z_coin || 0,
            currentXP: user?.exp || 0,
            nextLevelXP: expToUserLevel(user.level + 1) || 0,
            avatar: user?.avatar || AINZ_DEFAULT_AVATAR
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
    existingUser: User,
    avatar: string,
    message: Message,
    channel: any
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Updating user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const user = await updateUser(
            prisma,
            {
                id: existingUser?.id
            },
            { username, avatar }
        );

        const imageBuffer = await createProfileCard({
            username: user?.username || '',
            level: user?.level || 0,
            z_coin: user?.z_coin || 0,
            currentXP: user?.exp || 0,
            nextLevelXP: expToUserLevel(user.level + 1) || 0,
            avatar: user?.avatar || ''
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
