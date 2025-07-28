const dotenv = require('dotenv');
const { MezonClient } = require('mezon-sdk');
const express = require('express');
const cors = require('cors');

import {
    createUserController,
    getUserController
} from './controllers/user.controller';

dotenv.config();

const app = express();

app.use(cors());

async function main() {
    const client = new MezonClient(process.env.BOT_TOKEN);

    await client.login();

    client.onChannelMessage(async (event: any) => {
        if (event?.content?.t === '*ainz init') {
            const channelFetch = await client.channels.fetch(event.channel_id);
            const messageFetch = await channelFetch.messages.fetch(
                event.message_id
            );
            const { sender_id, display_name, avatar } = event;
            const createUserPayload = await createUserController(
                display_name,
                sender_id,
                avatar
            );
            messageFetch.reply(createUserPayload);
        }

        if (event?.content?.t === '*ainz info') {
            const channelFetch = await client.channels.fetch(event.channel_id);
            const messageFetch = await channelFetch.messages.fetch(
                event.message_id
            );
            const myInfoPayload = await getUserController(event.sender_id);
            messageFetch.reply(myInfoPayload);
        }
    });
}

main()
    .then(() => {
        console.log('bot start!');
    })
    .catch((error) => {
        console.error(error);
    });

module.exports = app;
