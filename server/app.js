const dotenv = require('dotenv');
const { MezonClient } = require('mezon-sdk');
const express = require('express');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

const embedElement = {
    color: '#f3aab5',
    title: 'Ainz Ooal Gown',
    description: "Hi I'm Ainz Ooal Gown",
    fields: [
        { name: 'Name', value: 'Ainz Ooal Gown', inline: true },
        { name: 'Age', value: '1000', inline: true },
        { name: 'Job', value: 'Master of the Death', inline: false }
    ],
    image: {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmEu4YN6-g4qQAnwyk7fx0YF5QrVvPM8rAw&s'
    },
};



async function main() {
    const client = new MezonClient(process.env.BOT_TOKEN);

    await client.login();

    client.onChannelMessage(async (event) => {
        if (event?.content?.t === '*hi') {
            const channelFetch = await client.channels.fetch(event.channel_id);
            const messageFetch = await channelFetch.messages.fetch(
                event.message_id
            );

            await messageFetch.reply({
                embed: [embedElement]
            });
        }
    });
}

main().then(() => {
    console.log('bot start!');
}).catch((error) => {
    console.error(error);
});

module.exports = app;
