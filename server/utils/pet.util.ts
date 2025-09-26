import { Prisma, Rarity } from '@prisma/client';

export const getRarityPets = (pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[], rarity: Rarity) => {
    return pets.filter((pet) => pet.rarity_id === rarity.id);
};

export const getRandomPet = (pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[]) => {
    const index = Math.floor(Math.random() * pets.length);
    return pets[index];
};
