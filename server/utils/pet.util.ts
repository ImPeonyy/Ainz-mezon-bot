import { Pet, Rarity } from '@prisma/client';

export const getRarityPets = (pets: Pet[], rarity: Rarity) => {
    return pets.filter((pet) => pet.rarity_id === rarity.id);
};

export const getRandomPet = (pets: Pet[]) => {
    const index = Math.floor(Math.random() * pets.length);
    return pets[index];
};
