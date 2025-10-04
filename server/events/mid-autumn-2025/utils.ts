import { getRandomPet, getRarityPets, shuffleRarities } from '@/utils';
import { ERarity, Prisma, Rarity } from '@prisma/client';
import { FOUR_SYMBOLS, ISymbol } from './constants';

export const getLimitedPetByChannelId = (
    pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[],
    symbol: ISymbol
) => {
    return pets.find((pet) => pet.id === symbol.id);
};

export const huntLimitedMidAutumnEvent = (
    rarities: Rarity[],
    pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[],
    channel_id: string
) => {
    const symbol = Object.values(FOUR_SYMBOLS).find((s) => s.channel_id === channel_id);
    if (!symbol) {
        const target = rarities.find((r) => r.type === ERarity.Limited);
        if (target) {
            target.catch_rate = 0;
        }
    }

    const shuffledRarities = shuffleRarities(rarities);
    const totalCatchRate = shuffledRarities.reduce((acc, rarity) => acc + rarity.catch_rate, 0);
    const r = Math.random() * totalCatchRate;
    let sum = 0;
    for (const rarity of shuffledRarities) {
        sum += rarity.catch_rate;
        if (r < sum) {
            if (rarity.type === ERarity.Limited && symbol) {
                const limitedPets = getRarityPets(pets, rarity);
                if (limitedPets.length > 0) {
                    return getLimitedPetByChannelId(limitedPets, symbol);
                }
            } else {
                const rarityPets = getRarityPets(pets, rarity);
                if (rarityPets.length > 0) {
                    return getRandomPet(rarityPets);
                }
            }
            return null;
        }
    }
};
