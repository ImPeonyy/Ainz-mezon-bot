const dotenv = require('dotenv');
const { MezonClient } = require('mezon-sdk');
const express = require('express');
const cors = require('cors');

import {
    extractFirstTokenWithAsterisk,
    parseActionCommand
} from './utils/misc.util';

import { getActionController } from './controllers/misc.controller';

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
            if (event.sender_id === client.clientId) {
                return;
            }

            const trigger = extractFirstTokenWithAsterisk(
                event?.content?.t
            )?.toLowerCase();
            if (trigger === '*ainz' || trigger === '*a') {
                const channelFetch = await client.channels.fetch(
                    event.channel_id
                );
                const messageFetch = await channelFetch.messages.fetch(
                    event.message_id
                );

                const { action } = parseActionCommand(event?.content?.t);

                const messagePayload = await getActionController(
                    event,
                    action || 'invalid command'
                );

                if (messagePayload) {
                    await messageFetch.reply(messagePayload);
                }
            }
        } catch (error) {
            console.error('Error in channel message handler:', error);
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

module.exports = app;
