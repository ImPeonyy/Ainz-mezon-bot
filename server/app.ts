import dotenv from 'dotenv';
import { MezonClient } from 'mezon-sdk';
import express from 'express';
import cors from 'cors';

import { extractFirstTokenWithAsterisk, parseActionCommand } from '@/utils';

import { depositController, getActionController } from '@/controllers';
import { BOT_ID, IGNORED_CHANNELS } from '@/constants';

dotenv.config();

const app = express();

app.use(cors());

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

async function main() {
    const client = new MezonClient(process.env.BOT_TOKEN);

    await client.login();

    client.onChannelMessage(async (event: any) => {
        try {
            if (event.sender_id !== BOT_ID && !IGNORED_CHANNELS.includes(event.channel_id)) {
                const trigger = extractFirstTokenWithAsterisk(event?.content?.t)?.toLowerCase();
                if (trigger === '*ainz' || trigger === '*a') {
                    const channelFetch = await client.channels.fetch(event.channel_id);
                    const messageFetch = await channelFetch.messages.fetch(event.message_id);

                    const { action, targetRaw } = parseActionCommand(event?.content?.t);

                    const messagePayload = await getActionController(
                        event,
                        action || 'invalid command',
                        channelFetch,
                        messageFetch,
                        client,
                        targetRaw
                    );

                    if (messagePayload) {
                        await messageFetch.reply(messagePayload);
                    }
                }
            }
        } catch (error) {
            console.error('Error in channel message handler:', error);
        }
    });

    client.onTokenSend(async (event: any) => {
        const { sender_id, amount, sender_name } = event;
        if (sender_id !== BOT_ID) {
            await depositController(sender_id, sender_name, amount, client);
        }
    });
}

main()
    .then(() => {
        console.log('bot start!');
    })
    .catch((error) => {
        console.error('Error starting bot:', error);
    });

export default app;
