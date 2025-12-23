import 'dotenv/config';

import { textMessage } from '@/utils';
import { sendDMToUser, sendTokenToUser, updateUser, upsertUser } from '@/services';
import { prisma } from '@/lib/db';
import { MezonClient } from 'mezon-sdk';
import { User } from '@prisma/client';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { BOT_ID } from '@/constants';

export const depositController = async (mezon_id: string, username: string, amount: number, client: MezonClient) => {
    try {
        await prisma.$transaction(async (tx) => {
            await upsertUser(
                tx,
                { id: mezon_id },
                { mezon_token: { increment: amount } },
                { id: mezon_id, username: username, mezon_token: amount }
            );

            await upsertUser(
                tx,
                { id: BOT_ID },
                { mezon_token: { increment: amount } },
                { id: BOT_ID, username: 'Ainz Bot', mezon_token: amount }
            );
        });
        console.log(`${username} has deposited [ ${amount}₫ ] 💰!`);
        await sendDMToUser(client, mezon_id, textMessage(`🎉 You have deposited [ ${amount}₫ ] 💰!`));
    } catch (error) {
        console.error('Error depositing:', error);
        await sendDMToUser(
            client,
            mezon_id,
            textMessage('❌ Deposit failed. Plz contact the admin.(thang.thieuquang)')
        );
    }
};

export const withdrawController = async (
    user: User,
    amount: number,
    client: MezonClient,
    message: Message,
    channel: any
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('Withdrawing...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        await prisma.$transaction(async (tx) => {
            await updateUser(tx, { id: user.id }, { mezon_token: { decrement: amount } });
            await updateUser(tx, { id: BOT_ID }, { mezon_token: { decrement: amount } });
        });
        await sendTokenToUser(client, user.id, amount);
        console.log(`${user.username} has withdrawn [ ${amount}₫ ] 💰!`);
        await messageFetch.update(textMessage(`🎉 You have withdrawn [ ${amount}₫ ] 💰!`));
    } catch (error) {
        console.error('Error withdrawing:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Withdraw failed. Plz contact the admin.(thang.thieuquang)'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const balanceController = async (user: User) => {
    try {
        return textMessage(`💰 Your balance is [ ${user.mezon_token}₫ ] 💰!`);
    } catch (error) {
        console.error('Error checking balance:', error);
        return textMessage('❌ Internal server error');
    }
};
