import { createProfileCard, expToUserLevel, getUserLevelFromExp, textMessage } from '@/utils';
import { createLeaderBoard, createTeam, createUser, getTodayUserDailyActivity, getUser, sendDMToUser, updateUser, uploadImageToCloudinary } from '@/services';

import { AINZ_DEFAULT_AVATAR, CLOUDINARY_PROFILE_FOLDER, MAX_USER_NAME_LENGTH } from '@/constants';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { isValidImageExtension } from '@/utils/misc.util';
import { MezonClient } from 'mezon-sdk';

export const getUserController = async (existingUser: Prisma.UserGetPayload<{ include: { team: true } }>, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Retrieving user...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const currentLevel = getUserLevelFromExp(existingUser?.exp || 0);
        const todayActivity = await getTodayUserDailyActivity(existingUser.id);

        const imageBuffer = await createProfileCard({
            username: existingUser?.username || '',
            level: currentLevel,
            z_coin: existingUser?.z_coin || 0,
            currentXP: existingUser?.exp || 0,
            nextLevelXP: expToUserLevel(currentLevel + 1),
            avatar: existingUser?.avatar || AINZ_DEFAULT_AVATAR,
            combat_power: existingUser?.team?.combat_power || 0,
            dailyActivity: [todayActivity?.daily || 0, todayActivity?.hunt || 0, todayActivity?.battle || 0]
        });

        const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_PROFILE_FOLDER);

        await messageFetch.update(
            {},
            [],
            [
                {
                    filename: 'profile.png',
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
    channel: any,
    client: MezonClient
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

        if (!isValidImageExtension(avatar)) {
            avatar = AINZ_DEFAULT_AVATAR;
            await sendDMToUser(client, mezon_id, textMessage('❌ Invalid avatar extension! Please use PNG, JPG, or JPEG format.\nYour avatar will be set to default.'));
        }

        const user = await createUser(prisma, { username: display_name, id: mezon_id, avatar, z_coin: 6666 });
        await createTeam(username.slice(0, MAX_USER_NAME_LENGTH), user.id);
        await createLeaderBoard(user.id);

        const currentLevel = getUserLevelFromExp(user?.exp || 0);

        const imageBuffer = await createProfileCard({
            username: user?.username || '',
            level: currentLevel,
            z_coin: user?.z_coin || 0,
            currentXP: user?.exp || 0,
            nextLevelXP: expToUserLevel(currentLevel + 1),
            avatar: user?.avatar || AINZ_DEFAULT_AVATAR,
            combat_power: 0,
            dailyActivity: [0, 0, 0]
        });

        const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_PROFILE_FOLDER);

        await messageFetch.update(
            {},
            [],
            [
                {
                    filename: 'profile.png',
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
    client: MezonClient,
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

        if (usernameUpdate.length > MAX_USER_NAME_LENGTH) {
            await messageFetch.update(
                textMessage(`❌ Username is too long! Maximum ${MAX_USER_NAME_LENGTH} characters allowed.`)
            );
            return;
        }

        if (!isValidImageExtension(avatar)) {
            avatar = AINZ_DEFAULT_AVATAR;
            await sendDMToUser(client, existingUser?.id, textMessage('❌ Invalid avatar extension! Please use PNG, JPG, or JPEG format.\nYour avatar will be set to default.'));
        }

        const user = await updateUser(
            prisma,
            {
                id: existingUser?.id
            },
            { username: usernameUpdate, avatar }
        );

        const currentLevel = getUserLevelFromExp(user?.exp || 0);
        const todayActivity = await getTodayUserDailyActivity(user.id);

        const imageBuffer = await createProfileCard({
            username: user?.username || '',
            level: currentLevel,
            z_coin: user?.z_coin || 0,
            currentXP: user?.exp || 0,
            nextLevelXP: expToUserLevel(currentLevel + 1),
            avatar: user?.avatar || AINZ_DEFAULT_AVATAR,
            combat_power: existingUser?.team?.combat_power || 0,
            dailyActivity: [todayActivity?.daily || 0, todayActivity?.hunt || 0, todayActivity?.battle || 0]
        });

        const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_PROFILE_FOLDER);

        await messageFetch.update(
            {},
            [],
            [
                {
                    filename: 'profile.png',
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
