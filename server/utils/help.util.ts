import { embedMessage, getRandomPastelHexColor } from '@/utils';

export const getHelpMessage = () => {
    return embedMessage({
        title: 'Here is the Ainz Mezon Bot guide help message',
        description: '\`TRIGGER: *ainz [action] [target(optional)].\`',
        fields: [
            {
                name: '❓ For Fun Help',
                value: 'help ff',
                inline: false
            },
            {
                name: '🪪 User',
                value: 'init | info | update | daily',
                inline: false
            },
            {
                name: '🐾 Pets',
                value: 'hunt | dex | mydex | rename | bag | bag "Rarity"',
                inline: false
            },
            {
                name: '👥 Team',
                value: 'team info | team create | team update | team add | team swap',
                inline: false
            },
            {
                name: '⚔️ Battle',
                value: 'battle | battle "@user"',
                inline: false
            }
        ],
        color: getRandomPastelHexColor(),
        footer: {
            text: `👑 Ainz Ooal Gown • ${new Date().toLocaleDateString('vi-VN')}`
        }
    });
};

export const getForFunHelpMessage = () => {
    return embedMessage({
        title: 'Here is the Ainz Mezon Bot for fun help message',
        description: '\`TRIGGER: *ainz [action] [target(optional)].\`',
        fields: [
            {
                name: '❓ Help',
                value: 'help',
                inline: false
            },
            {
                name: '😂 Memes',
                value: 'meme',
                inline: false
            },
            {
                name: '😃 Emotes',
                value: 'blush | bored | cry | happy | run | sleep | smug | think | yawn | nom',
                inline: false
            },
            {
                name: '⚡ Actions',
                value: 'baka | laugh | lurk | nod | nope | stare | thumbsup | wave | wink | yeet | bite | cuddle | feed | handhold | handshake | highfive | hug | kick | kiss | pat | peck | poke | punch | shoot | slap | tickle | shrug',
                inline: false
            },
            {
                name: '🧩 Flexible Actions',
                value: 'angry | dance | facepalm | pout | smile',
                inline: false
            }
        ],
        color: getRandomPastelHexColor(),
        footer: {
            text: `👑 Ainz Ooal Gown • ${new Date().toLocaleDateString('vi-VN')}`
        }
    });
};
