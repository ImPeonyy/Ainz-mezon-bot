import { createUser, getUser, updateUser } from '@/services';
import { embedMessage, textMessage } from '@/utils';

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

        return embedMessage({
            color: '#f3aab5',
            title: 'User Information',
            fields: [
                { name: 'Username', value: user?.username || '', inline: true },
                { name: 'Mezon ID', value: user?.id || '', inline: true },
                {
                    name: 'Z-Coin',
                    value: user?.z_coin?.toString() || '',
                    inline: true
                }
            ],
            image: { url: user?.avatar || '' }
        });
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

        return embedMessage({
            color: '#f3aab5',
            title: 'Create User Success!',
            fields: [
                { name: 'Username', value: user?.username || '', inline: true },
                { name: 'Mezon ID', value: user?.id || '', inline: true },
                {
                    name: 'Z-Coin',
                    value: user?.z_coin?.toString() || '',
                    inline: true
                }
            ],
            image: { url: user?.avatar || '' }
        });
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
            { username, id: mezon_id, avatar }
        );

        return embedMessage({
            color: '#f3aab5',
            title: 'Update User Success!',
            fields: [
                { name: 'Username', value: user?.username || '', inline: true },
                { name: 'Mezon ID', value: user?.id || '', inline: true },
                {
                    name: 'Z-Coin',
                    value: user?.z_coin?.toString() || '',
                    inline: true
                }
            ],
            image: { url: user?.avatar || '' }
        });
    } catch (error) {
        console.log('Error updating user:', error);
        return textMessage('Internal server error');
    }
};
