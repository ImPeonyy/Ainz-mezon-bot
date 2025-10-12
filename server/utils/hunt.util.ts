import { Pet, Prisma, Rarity, User, UserDailyActivities } from '@prisma/client';
import { getRandomPastelHexColor, getRandomPet, getRarityPets } from '@/utils';

import { EHuntMenuStatus, USE_DAILY_ACTIVITY } from '@/constants';
import {
    ButtonComponent,
    ChannelMessageContent,
    EButtonMessageStyle,
    EMessageComponentType,
    IMessageActionRow
} from 'mezon-sdk';

export const shuffleRarities = (rarities: Rarity[]) => {
    const arr = [...rarities];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const huntPet = (rarities: Rarity[], pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[]) => {
    const shuffledRarities = shuffleRarities(rarities);
    const totalCatchRate = shuffledRarities.reduce((acc, rarity) => acc + rarity.catch_rate, 0);
    const r = Math.random() * totalCatchRate;
    let sum = 0;
    for (const rarity of shuffledRarities) {
        sum += rarity.catch_rate;
        if (r < sum) {
            const rarityPets = getRarityPets(pets, rarity);
            if (rarityPets.length > 0) {
                return getRandomPet(rarityPets);
            }
            return null;
        }
    }
};

export const getHuntMenuMessage = (
    user: User,
    isFreeHunt: boolean,
    maxHunt: number,
    isLoading: boolean = false,
    message: string = 'Hunt',
    resultMessage: ChannelMessageContent = {
        t: '',
        ej: []
    }
) => {
    const cancelButton: ButtonComponent = {
        id: EHuntMenuStatus.CANCEL,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Cancel',
            style: EButtonMessageStyle.DANGER
        }
    };
    const huntX1Button: ButtonComponent = {
        id: EHuntMenuStatus.HUNT_X1,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Hunt x1',
            style: EButtonMessageStyle.SECONDARY
        }
    };
    const huntX5Button: ButtonComponent = {
        id: EHuntMenuStatus.HUNT_X5,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Hunt x5',
            style: EButtonMessageStyle.PRIMARY
        }
    };
    const huntX30Button: ButtonComponent = {
        id: EHuntMenuStatus.HUNT_X30,
        type: EMessageComponentType.BUTTON,
        component: {
            label: `Hunt x30`,
            style: EButtonMessageStyle.SUCCESS
        }
    };
    const freeHuntButton: ButtonComponent = {
        id: EHuntMenuStatus.FREE_HUNT,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Free Hunt',
            style: EButtonMessageStyle.PRIMARY
        }
    };
    const messageActionRow: IMessageActionRow = {
        components: [
            cancelButton,
            ...(maxHunt > 0 ? [huntX1Button] : []),
            ...(maxHunt >= 5 ? [huntX5Button] : []),
            ...(maxHunt >= 30 ? [huntX30Button] : []),
            ...(isFreeHunt ? [freeHuntButton] : [])
        ]
    };

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: `🎯 Hunt Menu`,
        description: `You have ${user.z_coin} Z Coins (Max hunt: ${maxHunt})`,
        thumbnail: { url: user.avatar },
        fields: [
            {
                name: message,
                value: ''
            }
        ]
    };
    const messagePayload: ChannelMessageContent = {
        t: resultMessage.t,
        ej: resultMessage.ej,
        embed: [embedConfig],
        components: isLoading ? [] : [messageActionRow]
    };

    return messagePayload;
};
