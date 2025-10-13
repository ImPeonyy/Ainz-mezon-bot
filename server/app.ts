import dotenv from 'dotenv';
import { MezonClient } from 'mezon-sdk';
import express from 'express';
import cors from 'cors';

import { embedMessage, extractFirstTokenWithAsterisk, getRandomPastelHexColor, parseActionCommand, textMessage } from '@/utils';

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
    const client = new MezonClient({
        token: process.env.BOT_TOKEN as string,
        botId: process.env.BOT_ID as string,
    });

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
                if (event.content.t === '*tamdao') {
                    const channelFetch = await client.channels.fetch(event.channel_id);
                    const messageFetch = await channelFetch.messages.fetch(event.message_id);
                    const embedConfig = {
                        color: getRandomPastelHexColor(),
                        title: '💪 TamDao đang khoe cơ trước mặt bạn!',
                        url: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758720175/snapedit_1758720146192_hsbr11.jpg',
                        description: '🤌 Hãy thưởng thức cơ bắp của anh ấy!',
                        image: { url: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758720175/snapedit_1758720146192_hsbr11.jpg' }
                    };
                    await messageFetch.reply(embedMessage(embedConfig));
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
