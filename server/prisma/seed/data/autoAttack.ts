import { EScalingType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type AutoAttackSeed = {
    pet_id: number;
    name: string;
    description: string;
    damage: number;
    scaling_type: EScalingType;
    attack_position: ETargetPosition;
};

export const seedAutoAttack = async () => {
    for (const autoAttack of autoAttackSeedData) {
        const existing = await prisma.autoAttack.findFirst({
            where: { name: autoAttack.name }
        });

        if (!existing) {
            await prisma.autoAttack.create({
                data: {
                    pet_id: autoAttack.pet_id,
                    name: autoAttack.name,
                    description: autoAttack.description,
                    damage: autoAttack.damage,
                    scaling_type: autoAttack.scaling_type,
                    attack_position: autoAttack.attack_position
                }
            });
        } else {
            await prisma.autoAttack.update({
                where: { id: existing.id },
                data: {
                    pet_id: autoAttack.pet_id,
                    name: autoAttack.name,
                    description: autoAttack.description,
                    damage: autoAttack.damage,
                    scaling_type: autoAttack.scaling_type,
                    attack_position: autoAttack.attack_position
                }
            });
        }
    }
};

export const autoAttackSeedData: AutoAttackSeed[] = [
    // Common (1-10) - không dùng All
    {
        pet_id: 1,
        name: 'Elephant Auto Attack',
        description: 'Đòn đánh cơ bản của Elephant, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 2,
        name: 'Rhinoceros Auto Attack',
        description: 'Đòn đánh cơ bản của Rhinoceros, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 3,
        name: 'Raccoon Auto Attack',
        description: 'Đòn đánh cơ bản của Raccoon, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 4,
        name: 'Frog Auto Attack',
        description: 'Đòn đánh cơ bản của Frog, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 5,
        name: 'Koala Auto Attack',
        description: 'Đòn đánh cơ bản của Koala, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 6,
        name: 'Rabbit Auto Attack',
        description: 'Đòn đánh cơ bản của Rabbit, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 7,
        name: 'Chameleon Auto Attack',
        description: 'Đòn đánh cơ bản của Chameleon, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 8,
        name: 'Ferret Auto Attack',
        description: 'Đòn đánh cơ bản của Ferret, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 9,
        name: 'Boar Auto Attack',
        description: 'Đòn đánh cơ bản của Boar, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 10,
        name: 'Ram Sheep Auto Attack',
        description: 'Đòn đánh cơ bản của Ram Sheep, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },

    // Uncommon (11-20) - không dùng All
    {
        pet_id: 11,
        name: 'Panda Auto Attack',
        description: 'Đòn đánh cơ bản của Panda, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 12,
        name: 'Pig Auto Attack',
        description: 'Đòn đánh cơ bản của Pig, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 13,
        name: 'Salamander Auto Attack',
        description: 'Đòn đánh cơ bản của Salamander, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 14,
        name: 'Fox Auto Attack',
        description: 'Đòn đánh cơ bản của Fox, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 15,
        name: 'Butterfly Auto Attack',
        description: 'Đòn đánh cơ bản của Butterfly, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 16,
        name: 'Dolphin Auto Attack',
        description: 'Đòn đánh cơ bản của Dolphin, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 17,
        name: 'Scorpion Auto Attack',
        description: 'Đòn đánh cơ bản của Scorpion, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 18,
        name: 'Eagle Auto Attack',
        description: 'Đòn đánh cơ bản của Eagle, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 19,
        name: 'Dino Auto Attack',
        description: 'Đòn đánh cơ bản của Dino, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 20,
        name: 'Lion Auto Attack',
        description: 'Đòn đánh cơ bản của Lion, gây 110% ATK cho 1 mục tiêu',
        damage: 110,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },

    // Rare (21-25) - có thể dùng All
    {
        pet_id: 21,
        name: 'Dread Porcupine Auto Attack',
        description: 'Đòn đánh cơ bản của Dread Porcupine, gây 125% ATK cho 1 mục tiêu',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 22,
        name: 'Owl Auto Attack',
        description: 'Đòn đánh cơ bản của Owl, gây 125% ATK cho 1 mục tiêu',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 23,
        name: 'Bee Auto Attack',
        description: 'Đòn đánh cơ bản của Bee, gây 125% ATK cho 1 mục tiêu',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 24,
        name: 'Penguin Auto Attack',
        description: 'Đòn đánh cơ bản của Penguin, gây 125% ATK cho 1 mục tiêu',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 25,
        name: 'Seahorse Auto Attack',
        description: 'Đòn đánh cơ bản của Seahorse, gây 125% ATK cho 1 mục tiêu',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },

    // Epic (26-33)
    {
        pet_id: 26,
        name: 'Basilisk Auto Attack',
        description: 'Đòn đánh cơ bản của Basilisk, gây 130% ATK cho 1 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 27,
        name: 'Cerberus Auto Attack',
        description: 'Đòn đánh cơ bản của Cerberus, gây 130% ATK cho 3 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 28,
        name: 'Dragon Auto Attack',
        description: 'Đòn đánh cơ bản của Dragon, gây 130% ATK cho 3 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 29,
        name: 'Griffin Auto Attack',
        description: 'Đòn đánh cơ bản của Griffin, gây 130% ATK cho 1 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 30,
        name: 'Hydra Auto Attack',
        description: 'Đòn đánh cơ bản của Hydra, gây 130% ATK cho 3 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 31,
        name: 'Phoenix Auto Attack',
        description: 'Đòn đánh cơ bản của Phoenix, gây 130% ATK cho 3 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 32,
        name: 'Unicorn Auto Attack',
        description: 'Đòn đánh cơ bản của Unicorn, gây 130% ATK cho 1 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 33,
        name: 'Manticore Auto Attack',
        description: 'Đòn đánh cơ bản của Manticore, gây 130% ATK cho 1 mục tiêu',
        damage: 130,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },

    // Legendary (34-45)
    {
        pet_id: 34,
        name: 'Lunar Rat Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Rat, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 35,
        name: 'Lunar Ox Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Ox, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 36,
        name: 'Lunar Tiger Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Tiger, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 37,
        name: 'Lunar Cat Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Cat, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 38,
        name: 'Lunar Dragon Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Dragon, gây 135% ATK cho 3 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 39,
        name: 'Lunar Snake Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Snake, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 40,
        name: 'Lunar Horse Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Horse, gây 135% ATK cho 3 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 41,
        name: 'Lunar Goat Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Goat, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 42,
        name: 'Lunar Monkey Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Monkey, gây 135% ATK cho 3 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 43,
        name: 'Lunar Rooster Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Rooster, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 44,
        name: 'Lunar Dog Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Dog, gây 135% ATK cho 1 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 45,
        name: 'Lunar Pig Auto Attack',
        description: 'Đòn đánh cơ bản của Lunar Pig, gây 135% ATK cho 3 mục tiêu',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },

    // Mythic (46-57)
    {
        pet_id: 46,
        name: 'Aries Auto Attack',
        description: 'Đòn đánh cơ bản của Aries, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 47,
        name: 'Taurus Auto Attack',
        description: 'Đòn đánh cơ bản của Taurus, gây 145% ATK cho 3 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 48,
        name: 'Gemini Auto Attack',
        description: 'Đòn đánh cơ bản của Gemini, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 49,
        name: 'Cancer Auto Attack',
        description: 'Đòn đánh cơ bản của Cancer, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 50,
        name: 'Leo Auto Attack',
        description: 'Đòn đánh cơ bản của Leo, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 51,
        name: 'Virgo Auto Attack',
        description: 'Đòn đánh cơ bản của Virgo, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 52,
        name: 'Libra Auto Attack',
        description: 'Đòn đánh cơ bản của Libra, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 53,
        name: 'Scorpius Auto Attack',
        description: 'Đòn đánh cơ bản của Scorpius, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 54,
        name: 'Sagittarius Auto Attack',
        description: 'Đòn đánh cơ bản của Sagittarius, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 55,
        name: 'Capricorn Auto Attack',
        description: 'Đòn đánh cơ bản của Capricorn, gây 145% ATK cho 3 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 56,
        name: 'Aquarius Auto Attack',
        description: 'Đòn đánh cơ bản của Aquarius, gây 145% ATK cho 3 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 57,
        name: 'Pisces Auto Attack',
        description: 'Đòn đánh cơ bản của Pisces, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },

    // Limited (58-61)
    {
        pet_id: 58,
        name: 'Azure Dragon Auto Attack',
        description: 'Đòn đánh cơ bản của Azure Dragon, gây 155% ATK cho 3 mục tiêu',
        damage: 155,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 59,
        name: 'White Tiger Auto Attack',
        description: 'Đòn đánh cơ bản của White Tiger, gây 155% ATK cho 1 mục tiêu',
        damage: 155,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 60,
        name: 'Vermilion Bird Auto Attack',
        description: 'Đòn đánh cơ bản của Vermilion Bird, gây 155% ATK cho 3 mục tiêu',
        damage: 155,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 61,
        name: 'Black Tortoise Snake Auto Attack',
        description: 'Đòn đánh cơ bản của Black Tortoise Snake, gây 155% ATK cho 1 mục tiêu',
        damage: 155,
        scaling_type: EScalingType.Hybrid,
        attack_position: ETargetPosition.Nearest
    }
];
