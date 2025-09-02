import { Pet, Rarity, User, UserDailyActivities } from '@prisma/client';
import { getRandomPet, getRarityPets } from '@/utils';

import { USE_DAILY_ACTIVITY } from '@/constants/Constant';

export const shuffleRarities = (rarities: Rarity[]) => {
    const arr = [...rarities];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const huntPet = (rarities: Rarity[], pets: Pet[]) => {
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

export const huntCheck = (user: User, todayActivity: UserDailyActivities) => {
    if (todayActivity && todayActivity.hunt === 0) {
        return USE_DAILY_ACTIVITY.HUNT.PRIORITY[2];
    }
    if (todayActivity && todayActivity.hunt === 1 && user.z_coin >= USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN) {
        return USE_DAILY_ACTIVITY.HUNT.PRIORITY[3];
    }
    return USE_DAILY_ACTIVITY.HUNT.PRIORITY[4];
};
