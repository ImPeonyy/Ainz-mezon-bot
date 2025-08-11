import { Pet, Rarity } from '@prisma/client';
import { getRandomPet, getRarityPets } from './pet.util';

export const shuffleRarities = (rarities: Rarity[]) => {
    const arr = [...rarities];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const HuntPet = (rarities: Rarity[], pets: Pet[]) => {
    const shuffledRarities = shuffleRarities(rarities);
    const r = Math.random();
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
