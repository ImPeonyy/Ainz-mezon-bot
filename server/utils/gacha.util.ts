import { Prisma } from '@prisma/client';
import { ButtonComponent, ChannelMessageContent, EButtonMessageStyle, EMessageComponentType, IMessageActionRow } from 'mezon-sdk';
import { embedMessage, getRandomPastelHexColor } from '@/utils';
import { EGachaStatus, GACHA_COUNT_LIMIT } from '@/constants';


export const getGachaCountMessage = (gachaCount: Prisma.GachaCountGetPayload<{ include: { user: true } }>) => {
    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: `🎰 Gacha Points - ${gachaCount.user.username}`,
        description: `Normal: ${gachaCount.normal} \nMid Autumn 2025: ${gachaCount.mid_autumn_2025} / ${GACHA_COUNT_LIMIT.MID_AUTUMN_2025}`,
        thumbnail: { url: gachaCount.user.avatar },
        footer: {
            text: `👑 Ainz Mezon Bot • ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    return embedMessage(embedConfig);
};

export const getNormalGachaMessage = (gachaCount: Prisma.GachaCountGetPayload<{ include: { user: true } }>) => {
    const gachaButton: ButtonComponent = {
        id: EGachaStatus.GACHA,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Gacha',
            style: EButtonMessageStyle.SUCCESS
        }
    };
    const cancelButton: ButtonComponent = {
        id: EGachaStatus.CANCEL,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Cancel',
            style: EButtonMessageStyle.DANGER
        }
    };
    const messageActionRow: IMessageActionRow = {
        components: [cancelButton, gachaButton]
    };

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: `🎰 Normal Gacha`,
        description: `Gacha Points: ${gachaCount.normal}`,
        thumbnail: { url: gachaCount.user.avatar }
    };
    const messagePayload: ChannelMessageContent = {
        embed: [embedConfig],
        components: [messageActionRow]
    };

    return messagePayload;
};

export const getMidAutumn2025GachaMessage = (
    gachaCount: Prisma.GachaCountGetPayload<{ include: { user: true } }>,
    message: string = 'Gacha'
) => {
    const gachaButton: ButtonComponent = {
        id: EGachaStatus.GACHA,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Gacha',
            style: EButtonMessageStyle.SUCCESS
        }
    };
    const cancelButton: ButtonComponent = {
        id: EGachaStatus.CANCEL,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Cancel',
            style: EButtonMessageStyle.DANGER
        }
    };
    const messageActionRow: IMessageActionRow = {
        components: [cancelButton, gachaButton]
    };

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: `🎰 Mid-Autumn 2025 Gacha`,
        description: `Gacha Points: ${gachaCount.mid_autumn_2025}`,
        thumbnail: { url: gachaCount.user.avatar },
        fields: [
            {
                name: message,
                value: ''
            }
        ]
    };
    const messagePayload: ChannelMessageContent = {
        embed: [embedConfig],
        components: [messageActionRow]
    };

    return messagePayload;
};

export const getGachaMessage = (pet: Prisma.PetGetPayload<{ include: { rarity: true } }>) => {
    let messagePayload: ChannelMessageContent = {
        t: `🎊  Congratulations! You’ve summoned the ${pet.rarity.type} pet: ${pet.name} — `,
        ej: []
    };

    messagePayload.ej?.push({
        emojiid: pet.mezon_emoji_id,
        s: messagePayload.t?.length || 0,
        e: messagePayload.t?.length || 0 + 1
    });

    return messagePayload;
};
