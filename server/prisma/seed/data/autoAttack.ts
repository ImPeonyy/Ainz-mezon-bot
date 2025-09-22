import { EScalingType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type AutoAttackSeed = {
    id: number;
    pet_id: number;
    name: string;
    description: string;
    damage: number;
    scaling_type: EScalingType;
    attack_position: ETargetPosition;
};

export const seedAutoAttack = async () => {
    for (const autoAttack of autoAttackSeedData) {
        await prisma.autoAttack.upsert({
            where: { id: autoAttack.id },
            update: {
                pet_id: autoAttack.pet_id,
                name: autoAttack.name,
                description: autoAttack.description,
                damage: autoAttack.damage,
                scaling_type: autoAttack.scaling_type,
                attack_position: autoAttack.attack_position
            },
            create: {
                id: autoAttack.id,
                pet_id: autoAttack.pet_id,
                name: autoAttack.name,
                description: autoAttack.description,
                damage: autoAttack.damage,
                scaling_type: autoAttack.scaling_type,
                attack_position: autoAttack.attack_position
            }
        });
    }
};

export const autoAttackSeedData: AutoAttackSeed[] = [
    // Common (1-10) - không dùng All
    {
        id: 1,
        pet_id: 1,
        name: 'Elephant AA',
        description: 'Elephant\'s basic attack deals 100% ATK to Nearest target.',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 2,
        pet_id: 2,
        name: 'Rhinoceros AA',
        description: 'Rhinoceros\'s basic attack deals 100% ATK to Nearest target.',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 3,
        pet_id: 3,
        name: 'Raccoon AA',
        description: 'Raccoon\'s basic attack deals 100% ATK to Random target.',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 4,
        pet_id: 4,
        name: 'Frog AA',
        description: 'Frog\'s basic attack deals 100% ATK to Lowest HP target.',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 5,
        pet_id: 5,
        name: 'Koala AA',
        description: 'Koala\'s basic attack deals 100% ATK to Random target.',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 6,
        pet_id: 6,
        name: 'Rabbit AA',
        description: 'Rabbit\'s basic attack deals 100% ATK to Random target.',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 7,
        pet_id: 7,
        name: 'Chameleon AA',
        description: 'Chameleon\'s basic attack deals 100% ATK to Lowest HP target.',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 8,
        pet_id: 8,
        name: 'Ferret AA',
        description: 'Ferret\'s basic attack deals 100% ATK to Lowest HP target.',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 9,
        pet_id: 9,
        name: 'Boar AA',
        description: 'Boar\'s basic attack deals 100% ATK to Nearest target.',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 10,
        pet_id: 10,
        name: 'Ram Sheep AA',
        description: 'Ram Sheep\'s basic attack deals 100% ATK to Nearest target.',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },

    // Uncommon (11-20) - không dùng All
    {
        id: 11,
        pet_id: 11,
        name: 'Panda AA',
        description: 'Panda\'s basic attack deals 110% ATK to Nearest target.',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 12,
        pet_id: 12,
        name: 'Pig AA',
        description: 'Pig\'s basic attack deals 110% ATK to Nearest target.',
        damage: 110,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 13,
        pet_id: 13,
        name: 'Salamander AA',
        description: 'Salamander\'s basic attack deals 110% ATK to Lowest HP target.',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 14,
        pet_id: 14,
        name: 'Fox AA',
        description: 'Fox\'s basic attack deals 110% ATK to Random target.',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 15,
        pet_id: 15,
        name: 'Butterfly AA',
        description: 'Butterfly\'s basic attack deals 110% ATK to Random target.',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 16,
        pet_id: 16,
        name: 'Dolphin AA',
        description: 'Dolphin\'s basic attack deals 110% ATK to Random target.',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 17,
        pet_id: 17,
        name: 'Scorpion AA',
        description: 'Scorpion\'s basic attack deals 110% ATK to Lowest HP target.',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 18,
        pet_id: 18,
        name: 'Eagle AA',
        description: 'Eagle\'s basic attack deals 110% ATK to Farthest target.',
        damage: 110,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 19,
        pet_id: 19,
        name: 'Dino AA',
        description: 'Dino\'s basic attack deals 110% ATK to Nearest target.',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 20,
        pet_id: 20,
        name: 'Lion AA',
        description: 'Lion\'s basic attack deals 110% ATK to Nearest target.',
        damage: 110,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },

    // Rare (21-25) - có thể dùng All
    {
        id: 21,
        pet_id: 21,
        name: 'Dread Porcupine AA',
        description: 'Dread Porcupine\'s basic attack deals 125% ATK to Nearest target.',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 22,
        pet_id: 22,
        name: 'Owl AA',
        description: 'Owl\'s basic attack deals 125% ATK to Lowest HP target.',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 23,
        pet_id: 23,
        name: 'Bee AA',
        description: 'Bee\'s basic attack deals 125% ATK to Lowest HP target.',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 24,
        pet_id: 24,
        name: 'Penguin AA',
        description: 'Penguin\'s basic attack deals 125% ATK to Random target.',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 25,
        pet_id: 25,
        name: 'Seahorse AA',
        description: 'Seahorse\'s basic attack deals 125% ATK to Nearest target.',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },

    // Epic (26-33)
    {
        id: 26,
        pet_id: 26,
        name: 'Basilisk AA',
        description: 'Basilisk\'s basic attack deals 130% ATK to Random target.',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 27,
        pet_id: 27,
        name: 'Cerberus AA',
        description: 'Cerberus\'s basic attack deals 90% ATK to All targets.',
        damage: 90,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        id: 28,
        pet_id: 28,
        name: 'Dragon AA',
        description: 'Dragon\'s basic attack deals 90% ATK to All targets.',
        damage: 90,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 29,
        pet_id: 29,
        name: 'Griffin AA',
        description: 'Griffin\'s basic attack deals 130% ATK to Nearest target.',
        damage: 130,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 30,
        pet_id: 30,
        name: 'Hydra AA',
        description: 'Hydra\'s basic attack deals 90% ATK to All targets.',
        damage: 90,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 31,
        pet_id: 31,
        name: 'Phoenix AA',
        description: 'Phoenix\'s basic attack deals 90% ATK to All targets.',
        damage: 90,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 32,
        pet_id: 32,
        name: 'Unicorn AA',
        description: 'Unicorn\'s basic attack deals 130% ATK to Nearest target.',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 33,
        pet_id: 33,
        name: 'Manticore AA',
        description: 'Manticore\'s basic attack deals 130% ATK to Nearest target.',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },

    // Legendary (34-45)
    {
        id: 34,
        pet_id: 34,
        name: 'Lunar Rat AA',
        description: 'Lunar Rat\'s basic attack deals 135% ATK to Lowest HP target.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 35,
        pet_id: 35,
        name: 'Lunar Ox AA',
        description: 'Lunar Ox\'s basic attack deals 135% ATK to Random target.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 36,
        pet_id: 36,
        name: 'Lunar Tiger AA',
        description: 'Lunar Tiger\'s basic attack deals 135% ATK to Nearest target.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 37,
        pet_id: 37,
        name: 'Lunar Cat AA',
        description: 'Lunar Cat\'s basic attack deals 135% ATK to Random target.',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 38,
        pet_id: 38,
        name: 'Lunar Dragon AA',
        description: 'Lunar Dragon\'s basic attack deals 95% ATK to All targets.',
        damage: 95,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 39,
        pet_id: 39,
        name: 'Lunar Snake AA',
        description: 'Lunar Snake\'s basic attack deals 135% ATK to Random target.',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 40,
        pet_id: 40,
        name: 'Lunar Horse AA',
        description: 'Lunar Horse\'s basic attack deals 95% ATK to All targets.',
        damage: 95,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        id: 41,
        pet_id: 41,
        name: 'Lunar Goat AA',
        description: 'Lunar Goat\'s basic attack deals 135% ATK to Random target.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 42,
        pet_id: 42,
        name: 'Lunar Monkey AA',
        description: 'Lunar Monkey\'s basic attack deals 95% ATK to All targets.',
        damage: 95,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        id: 43,
        pet_id: 43,
        name: 'Lunar Rooster AA',
        description: 'Lunar Rooster\'s basic attack deals 135% ATK to Random target.',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 44,
        pet_id: 44,
        name: 'Lunar Dog AA',
        description: 'Lunar Dog\'s basic attack deals 135% ATK to Random target.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 45,
        pet_id: 45,
        name: 'Lunar Pig AA',
        description: 'Lunar Pig\'s basic attack deals 95% ATK to All targets.',
        damage: 95,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },

    // Mythic (46-57)
    {
        id: 46,
        pet_id: 46,
        name: 'Aries AA',
        description: 'Aries\'s basic attack deals 145% ATK to Nearest target.',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 47,
        pet_id: 47,
        name: 'Taurus AA',
        description: 'Taurus\'s basic attack deals 115% ATK to All targets.',
        damage: 115,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        id: 48,
        pet_id: 48,
        name: 'Gemini AA',
        description: 'Gemini\'s basic attack deals 145% ATK to Farthest target.',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 49,
        pet_id: 49,
        name: 'Cancer AA',
        description: 'Cancer\'s basic attack deals 145% ATK to Lowest HP target.',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 50,
        pet_id: 50,
        name: 'Leo AA',
        description: 'Leo\'s basic attack deals 145% ATK to Nearest target.',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 51,
        pet_id: 51,
        name: 'Virgo AA',
        description: 'Virgo\'s basic attack deals 145% ATK to Lowest HP target.',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 52,
        pet_id: 52,
        name: 'Libra AA',
        description: 'Libra\'s basic attack deals 145% ATK to Random target.',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        id: 53,
        pet_id: 53,
        name: 'Scorpius AA',
        description: 'Scorpius\'s basic attack deals 145% ATK to Nearest target.',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 54,
        pet_id: 54,
        name: 'Sagittarius AA',
        description: 'Sagittarius\'s basic attack deals 145% ATK to Farthest target.',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 55,
        pet_id: 55,
        name: 'Capricorn AA',
        description: 'Capricorn\'s basic attack deals 115% ATK to All targets.',
        damage: 115,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 56,
        pet_id: 56,
        name: 'Aquarius AA',
        description: 'Aquarius\'s basic attack deals 115% ATK to All targets.',
        damage: 115,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 57,
        pet_id: 57,
        name: 'Pisces AA',
        description: 'Pisces\'s basic attack deals 145% ATK to Random target.',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },

    // Limited (58-61)
    {
        id: 58,
        pet_id: 58,
        name: 'Azure Dragon AA',
        description: 'Azure Dragon\'s basic attack deals 125% ATK to All targets.',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 59,
        pet_id: 59,
        name: 'White Tiger AA',
        description: 'White Tiger\'s basic attack deals 155% ATK to Nearest target.',
        damage: 155,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 60,
        pet_id: 60,
        name: 'Vermilion Bird AA',
        description: 'Vermilion Bird\'s basic attack deals 125% ATK to All targets.',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        id: 61,
        pet_id: 61,
        name: 'Black Tortoise Snake AA',
        description: 'Black Tortoise Snake\'s basic attack deals 155% ATK to Nearest target.',
        damage: 155,
        scaling_type: EScalingType.Hybrid,
        attack_position: ETargetPosition.Nearest
    }
];
