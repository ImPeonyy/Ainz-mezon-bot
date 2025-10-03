import {
    EShopExchangeStatus,
    EShopUpLevelPetStatus,
    EShopExchange,
    SHOP_EXCHANGE_RATE,
    EShopUpLevelPet,
    LEVEL_COSTS,
    EXCHANGE_RATE
} from '@/constants';
import {
    ButtonComponent,
    ChannelMessageContent,
    EButtonMessageStyle,
    EMessageComponentType,
    IInteractiveMessageProps,
    IMessageActionRow
} from 'mezon-sdk/dist/cjs/interfaces/client';
import { getPetLevelFromExp, getRandomPastelHexColor } from '@/utils';
import { Prisma, User } from '@prisma/client';

export const getZCoinAfterExchange = (amount: number) => {
    return Math.round(amount * SHOP_EXCHANGE_RATE);
};

export const getZCoinCost = (level: number): number => {
    const rule = LEVEL_COSTS.find((r) => level < r.maxLevel);
    return rule ? rule.cost : 0;
};

export const getShopExchangeMessage = (user: User, value: number = 1000, message: string = 'Exchange') => {
    const exchangeButton: ButtonComponent = {
        id: EShopExchangeStatus.EXCHANGE,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Exchange',
            style: EButtonMessageStyle.SUCCESS
        }
    };
    const cancelButton: ButtonComponent = {
        id: EShopExchangeStatus.CANCEL,
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
        description: `💱 Exchange Rate: 10000₫ = ${EXCHANGE_RATE} Z Coin`,
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
                value: ''
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

export const getShopUpLevelPetMessage = (
    user: User,
    userPet: Prisma.UserPetGetPayload<{
        include: {
            pet: true;
        };
    }>[],
    message: string = 'Level Up',
    isLoading: boolean = false
) => {
    const upLevelButton: ButtonComponent = {
        id: EShopUpLevelPetStatus.UP_LEVEL,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Up Level',
            style: EButtonMessageStyle.SUCCESS
        }
    };
    const cancelButton: ButtonComponent = {
        id: EShopUpLevelPetStatus.CANCEL,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Cancel',
            style: EButtonMessageStyle.SECONDARY
        }
    };
    const messageActionRow: IMessageActionRow = {
        components: [cancelButton, upLevelButton]
    };

    const listPet = userPet.map((userPet) => {
        const petLevel = getPetLevelFromExp(userPet.exp);
        return {
            label:
                userPet.pet.name === userPet.nickname
                    ? `Lv.${petLevel}: ${userPet.pet.name}`
                    : `Lv.${petLevel}: ${userPet.pet.name} (${userPet.nickname})`,
            value: userPet.id
        };
    });

    const embedConfig: IInteractiveMessageProps = {
        color: getRandomPastelHexColor(),
        title: `🎁 Special Offer`,
        description: `⏳ Limited time – don’t miss out!\n✨ ${LEVEL_COSTS[0].cost} Z Coin per Level for pet under Lv.25!\n✨ ${LEVEL_COSTS[1].cost} Z Coin per Level for pet Lv.25-50!\n✨ ${LEVEL_COSTS[2].cost} Z Coin per Level for pet Lv.50-75!\n✨ ${LEVEL_COSTS[3].cost} Z Coin per Level for pet Lv.75+!`,
        fields: [
            {
                name: 'Select Pet:',
                value: `💰 Your balance: ${user.z_coin.toString()} Z Coin`,
                inputs: {
                    id: EShopUpLevelPet.USER_PET_ID,
                    type: EMessageComponentType.SELECT,
                    component: {
                        options: listPet
                    }
                }
            },
            {
                name: message,
                value: ''
            }
        ],
        footer: {
            text: `👑 Ainz Mezon Bot • ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    const messagePayload: ChannelMessageContent = {
        embed: [embedConfig],
        components: isLoading ? [] : [messageActionRow]
    };

    return messagePayload;
};
