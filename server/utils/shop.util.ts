import { EShopStatus, EShopExchange, SHOP_EXCHANGE_RATE } from '@/constants';
import {
    ButtonComponent,
    ChannelMessageContent,
    EButtonMessageStyle,
    EMessageComponentType,
    IInteractiveMessageProps,
    IMessageActionRow
} from 'mezon-sdk/dist/cjs/interfaces/client';
import { getRandomPastelHexColor } from '@/utils';
import { User } from '@prisma/client';

export const getZCoinAfterExchange = (amount: number) => {
    return Math.round(amount * SHOP_EXCHANGE_RATE);
};

export const getShopExchangeMessage = (user: User, value: number = 1000, message: string = 'Exchange') => {
    const exchangeButton: ButtonComponent = {
        id: EShopStatus.EXCHANGE,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Exchange',
            style: EButtonMessageStyle.SUCCESS
        }
    };
    const cancelButton: ButtonComponent = {
        id: EShopStatus.CANCEL,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Cancel',
            style: EButtonMessageStyle.SECONDARY
        }
    };
    const messageActionRow: IMessageActionRow = {
        components: [cancelButton, exchangeButton]
    };

    const embedConfig: IInteractiveMessageProps = {
        color: getRandomPastelHexColor(),
        title: `🛒 Shop Exchange`,
        description: '💱 Exchange Rate: 10000₫ = 3333 Z Coin',
        fields: [
            {
                name: 'Mezon Token:',
                value: `💰 Your balance: ${user.mezon_token.toString()}₫`,
                inputs: {
                    id: EShopExchange.MEZON_TOKEN,
                    type: EMessageComponentType.INPUT,
                    component: {
                        placeholder: 'Enter amount to exchange',
                        required: true,
                        type: 'number',
                        defaultValue: value.toString()
                    }
                }
            },
            {
                name: message,
                value: '',
            }
        ],
        footer: {
            text: `👑 Ainz Mezon Bot • ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    const messagePayload: ChannelMessageContent = {
        embed: [embedConfig],
        components: [messageActionRow]
    };

    return messagePayload;
};
