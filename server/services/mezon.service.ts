import { BOT_ID } from '@/constants';
import { APISentTokenRequest, ChannelMessageContent, MezonClient } from 'mezon-sdk';

export const sendDMToUser = async (client: MezonClient, mezon_id: string, messagePayload: ChannelMessageContent) => {
    try {
        const user = await client.users.fetch(mezon_id);
        await user.sendDM(messagePayload);
    } catch (error) {
        console.error(`Failed to send DM to user ${mezon_id}:`, error);
        throw error;
    }
};

export const sendTokenToUser = async (client: MezonClient, mezon_id: string, tokenAmount: number) => {
    try {
        const sendTokenPayload: APISentTokenRequest = {
            receiver_id: mezon_id,
            sender_id: BOT_ID,
            sender_name: 'Ainz Bot',
            amount: tokenAmount,
            note: 'From Ainz Bot'
        };
        await client.sendToken(sendTokenPayload);
        console.log(`Token sent to user ${mezon_id}`);
    } catch (error) {
        console.error(`Failed to send token to user ${mezon_id}:`, error);
        throw error;
    }
};
