import { ChannelMessageContent, EmojiOnMessage, IEmbedProps } from 'mezon-sdk';

import { Pet } from '@prisma/client';

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

export const emojiMessage = (emoji: EmojiOnMessage) => {
    const messagePayload: ChannelMessageContent = {
        ej: [emoji]
    };
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
