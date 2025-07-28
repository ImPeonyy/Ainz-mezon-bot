import { ChannelMessageContent, IEmbedProps } from 'mezon-sdk';

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
