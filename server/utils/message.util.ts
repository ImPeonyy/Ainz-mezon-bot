import { ChannelMessageContent, EmojiOnMessage, IEmbedProps } from 'mezon-sdk';

import { ACTIONS } from '@/constants/Commands';
import { Prisma, Pet, User } from '@prisma/client';
import { getRarityColor, getUrlEmoji } from '@/utils';
import { FAV_COLOR } from '@/constants/Constant';
import { IBattle } from '@/constants/Type';

export const textMessage = (message: string) => {
    const messagePayload: ChannelMessageContent = {
        t: message
    };

    return messagePayload;
};

export const embedMessage = (embed: IEmbedProps) => {
    const embedPayload: IEmbedProps = embed;
    const messagePayload: ChannelMessageContent = {
        embed: [embedPayload]
    };
    return messagePayload;
};

export const emojiMessage = (emoji: EmojiOnMessage[]) => {
    const messagePayload: ChannelMessageContent = {
        ej: emoji
    };
    return messagePayload;
};

export const emojisMessage = (emojis: EmojiOnMessage[]) => {
    let messagePayload: ChannelMessageContent = {
        t: 'Your result:\n',
        ej: []
    };

    emojis.forEach((emoji) => {
        messagePayload.ej?.push({
            emojiid: emoji.emojiid,
            s: messagePayload.t?.length || 0,
            e: messagePayload.t?.length || 0 + 1
        });
        messagePayload.t += ``;
    });

    return messagePayload;
};

export const bagMessage = (pets: Pet[]) => {
    let messagePayload: ChannelMessageContent = {
        t: 'Your bag contains the following pets:\n',
        ej: []
    };

    pets.forEach((pet) => {
        messagePayload.ej?.push({
            emojiid: pet.mezon_emoji_id,
            s: messagePayload.t?.length || 0,
            e: messagePayload.t?.length || 0 + 1
        });
        messagePayload.t += ` : ${pet.name}\t`;
    });

    return messagePayload;
};

export const getActionMessage = (action: string, actor: string, target?: string) => {
    if (!ACTIONS[action]) {
        return {
            t: `**${actor}** does something mysterious...`
        };
    }

    const actionConfig = ACTIONS[action];

    const message = actionConfig.getMessage(actor, target);

    return {
        t: message
    };
};

export const getDexMessage = (
    pet: Prisma.PetGetPayload<{
        include: { statistic: true; rarity: true; autoAttack: true; passiveSkill: true; activeSkill: true };
    }>
) => {
    const statistic = pet.statistic;

    const messageContent = [
        {
            name: 'Description',
            value: pet?.description || 'No description',
            inline: false
        }
    ];

    if (statistic) {
        messageContent.push(
            { name: 'Rarity', value: statistic.rarity, inline: true },
            { name: 'Role', value: statistic.role, inline: true },
            { name: 'Attack type', value: statistic.scaling_type, inline: true },
            { name: 'HP', value: statistic.hp.toString(), inline: true },
            { name: 'AD', value: statistic.ad.toString(), inline: true },
            { name: 'AR', value: statistic.ar.toString(), inline: true },
            { name: 'Mana', value: statistic.mana.toString(), inline: true },
            { name: 'AP', value: statistic.ap.toString(), inline: true },
            { name: 'MR', value: statistic.mr.toString(), inline: true }
        );
    }

    return embedMessage({
        color: getRarityColor(statistic.rarity),
        title: `${pet?.name} Information 🔍`,
        thumbnail: { url: getUrlEmoji(pet.mezon_emoji_id) },
        fields: messageContent,
        footer: {
            text: `📙 Ainz Ooal Gown • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    });
};

export const getBattleMessage = (user: User, battle: IBattle, image: string, footerMsg: string) => {
    const messagePayload: ChannelMessageContent = {
        embed: [
            {
                color: FAV_COLOR,
                title: `${user.username} is in a battle!`,
                thumbnail: { url: user.avatar },
                //     description: `Team A\n
                // Lv. ${battle.teamA[1].info.level} - ${battle.teamA[1].info.nickname}\n
                // Lv. ${battle.teamA[3].info.level} - ${battle.teamA[3].info.nickname}\n
                // Lv. ${battle.teamA[5].info.level} - ${battle.teamA[5].info.nickname}\n\n
                // Team B\n
                // Lv. ${battle.teamB[2].info.level} - ${battle.teamB[2].info.nickname}\n
                // Lv. ${battle.teamB[4].info.level} - ${battle.teamB[4].info.nickname}\n
                // Lv. ${battle.teamB[6].info.level} - ${battle.teamB[6].info.nickname}`,
                fields: [
                    {
                        name: 'Team A',
                        value: `Lv. ${battle.teamA[1].info.level} - ${battle.teamA[1].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamA[3].info.level} - ${battle.teamA[3].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamA[5].info.level} - ${battle.teamA[5].info.nickname}`,
                        inline: true
                    },
                    {
                        name: 'Team B',
                        value: `Lv. ${battle.teamB[2].info.level} - ${battle.teamB[2].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamB[4].info.level} - ${battle.teamB[4].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamB[6].info.level} - ${battle.teamB[6].info.nickname}`,
                        inline: true
                    }
                ],
                image: { url: image },
                footer: {
                    text: footerMsg
                }
            }
        ]
    };

    return messagePayload;
};
