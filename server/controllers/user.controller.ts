import { createProfileCard, expToUserLevel, textMessage } from '@/utils';
import { createUser, getUser, updateUser, uploadImageToCloudinary } from '@/services';

import { CLOUDINARY_PROFILE_FOLDER } from '@/constants/Constant';
import { prisma } from '@/lib/db';

export const getUserController = async (mezon_id: string) => {
    try {
        if (!mezon_id) {
            return textMessage('Error retrieving mezon id');
        }

        const user = await getUser(mezon_id);

        if (!user) {
            return textMessage('User not found');
        }

        const imageBuffer = await createProfileCard({
            username: user?.username || '',
            level: user?.level || 0,
            z_coin: user?.z_coin || 0,
            currentXP: user?.exp || 0,
            nextLevelXP:  expToUserLevel(user.level + 1)|| 0,
            avatar: user?.avatar || ''
        });

        const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_PROFILE_FOLDER);

        return image.secure_url;
    } catch (error) {
        console.log('Error getting user:', error);
        return textMessage('Internal server error');
    }
};

export const createUserController = async (username: string, mezon_id: string, avatar: string) => {
    try {
        if (!username || !mezon_id) {
            return textMessage('Error retrieving username or mezon id');
        }

        const existingUser = await getUser(mezon_id);

        if (existingUser) {
            return textMessage('User already exists');
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

        return image.secure_url;
    } catch (error) {
        console.log('Error creating user:', error);
        return textMessage('Internal server error');
    }
};

export const updateUserController = async (username: string, mezon_id: string, avatar: string) => {
    try {
        if (!username || !mezon_id) {
            return textMessage('Error retrieving username or mezon id');
        }

        const existingUser = await getUser(mezon_id);

        if (!existingUser) {
            return textMessage('User not found');
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

        return image.secure_url;
    } catch (error) {
        console.log('Error updating user:', error);
        return textMessage('Internal server error');
    }
};
