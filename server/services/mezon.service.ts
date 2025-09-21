import { ChannelMessageContent, MezonClient } from 'mezon-sdk';

export const sendDMToUser = async (client: MezonClient, mezon_id: string, messagePayload: ChannelMessageContent) => {
    try {
        console.log(`Sending DM to user ${mezon_id}`);
        const dmClan = await client.clans.fetch('0');
        const user = await dmClan.users.fetch(mezon_id);
        await user.sendDM(messagePayload);
        console.log(`DM sent to user ${mezon_id}`);
    } catch (error) {
        console.error(`Failed to send DM to user ${mezon_id}:`, error);
    }
};
