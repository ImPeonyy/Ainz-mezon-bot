import { embedMessage, getRandomPastelHexColor } from '@/utils';

export const getHelpMessage = () => {
    return embedMessage({
        title: 'Here is the Ainz Mezon Bot guide help message',
        description: '\`TRIGGER: *ainz [action] [target(optional)].\`\nNOTE: Daily Activity is reset at midnight.\nDaily: 1 time.\nHunt: 1 time (next hunt is 300 Z Coin).\nBattle: 10 times.',
        fields: [
            {
                name: '❓ For Fun Help',
                value: 'help ff',
                inline: false
            },
            {
                name: '🪪 User',
                value: 'init | info | update [username] | daily',
                inline: false
            },
            {
                name: '💸 Wallet',
                value: 'balance | wd [amount]',
                inline: false
            },
            {
                name: '🏆 Leaderboard',
                value: 'lb | lb lv | lb cp | lb wins | lb losses',
                inline: false
            },
            {
                name: '🐾 Pets',
                value: 'hunt | dex [pet name] | mydex [pet name] | rename [pet name] > [nickname] | bag | bag [Rarity]',
                inline: false
            },
            {
                name: '👥 Team',
                value: 'team info | team fill | team update [team name] | team add [position] [pet name] | team swap [position1] [position2]',
                inline: false
            },
            {
                name: '⚔️ Battle',
                value: 'battle | battle "@user"',
                inline: false
            },
            {
                name: '💰 Challenge',
                value: 'solo [bet] [@user] | reply user with *ainz solo [bet]',
                inline: false
            },
            {
                name: '🛒 Shop',
                value: 'trade | uplv',
                inline: false
            },
            {
                name: '🎰 Gacha',
                value: 'gacha | gacha ma2025',
                inline: false
            }
        ],
        color: getRandomPastelHexColor(),
        footer: {
            text: `👑 Ainz Mezon Bot • ${new Date().toLocaleDateString('vi-VN')}`
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
            text: `👑 Ainz Mezon Bot • ${new Date().toLocaleDateString('vi-VN')}`
        }
    });
};
