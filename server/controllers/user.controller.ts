import { createProfileCard, expToUserLevel, textMessage } from '@/utils';
import { createUser, getUser, updateUser, uploadImageToCloudinary } from '@/services';

import { CLOUDINARY_PROFILE_FOLDER } from '@/constants/Constant';
import { prisma } from '@/lib/db';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';

export const getUserController = async (mezon_id: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Retrieving user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        
        if (!mezon_id) {
            await messageFetch.update(textMessage('Error retrieving mezon id'));
            return;
        }

        const user = await getUser(mezon_id);

        if (!user) {
            await messageFetch.update(textMessage('User not found'));
            return;
        }

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
        console.log('Error getting user:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const createUserController = async (username: string, mezon_id: string, avatar: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Initializing user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        
        if (!username || !mezon_id) {
            await messageFetch.update(textMessage('Error retrieving username or mezon id'));
            return;
        }

        const existingUser = await getUser(mezon_id);

        if (existingUser) {
            await messageFetch.update(textMessage('User already exists'));
            return;
        }

        const user = await createUser(prisma, { username, id: mezon_id, avatar });

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
        console.log('Error creating user:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const updateUserController = async (username: string, mezon_id: string, avatar: string, message: Message, channel: any) => {
   let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Updating user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (!username || !mezon_id) {
            await messageFetch.update(textMessage('Error retrieving username or mezon id'));
            return;
        }

        const existingUser = await getUser(mezon_id);

        if (!existingUser) {
            await messageFetch.update(textMessage('User not found'));
            return;
        }

        const user = await updateUser(
            prisma,
            {
                id: existingUser.id
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
        console.log('Error updating user:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
