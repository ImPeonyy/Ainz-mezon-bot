import { ChannelMessageContent, EmojiOnMessage, IEmbedProps } from 'mezon-sdk';

import { ACTIONS } from '@/constants/Commands';
import { Prisma, Pet } from '@prisma/client';
import { getRarityColor, getUrlEmoji } from '@/utils';

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
            { name: 'Attack type', value: statistic.attack_type, inline: true },
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
