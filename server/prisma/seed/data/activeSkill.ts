import { EScalingType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ActiveSkillSeed = {
    pet_id: number;
    name: string;
    description: string;
    mana_cost: number;
    scaling_type: EScalingType;
    damage?: number;
    attack_position?: ETargetPosition;
};

export const seedActiveSkill = async () => {
    for (const activeSkill of activeSkillSeedData) {
        const existing = await prisma.activeSkill.findFirst({
            where: { pet_id: activeSkill.pet_id }
        });

        if (!existing) {
            await prisma.activeSkill.create({
                data: {
                    pet_id: activeSkill.pet_id,
                    name: activeSkill.name,
                    description: activeSkill.description,
                    mana_cost: activeSkill.mana_cost,
                    scaling_type: activeSkill.scaling_type,
                    damage: activeSkill.damage,
                    attack_position: activeSkill.attack_position
                }
            });
        } else {
            await prisma.activeSkill.update({
                where: { id: existing.id },
                data: {
                    pet_id: activeSkill.pet_id,
                    name: activeSkill.name,
                    description: activeSkill.description,
                    mana_cost: activeSkill.mana_cost,
                    scaling_type: activeSkill.scaling_type,
                    damage: activeSkill.damage,
                    attack_position: activeSkill.attack_position
                }
            });
        }
    }
};

export const activeSkillSeedData: ActiveSkillSeed[] = [
    //Common
    {
        pet_id: 1,
        name: 'Elephant Active Skill',
        description: 'Kỹ năng chủ động của Elephant, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 2,
        name: 'Rhinoceros Active Skill',
        description: 'Kỹ năng chủ động của Rhinoceros, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 3,
        name: 'Raccoon Active Skill',
        description: 'Kỹ năng chủ động của Raccoon, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 4,
        name: 'Frog Active Skill',
        description: 'Kỹ năng chủ động của Frog, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 5,
        name: 'Koala Active Skill',
        description: 'Kỹ năng chủ động của Koala, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 6,
        name: 'Rabbit Active Skill',
        description: 'Kỹ năng chủ động của Rabbit, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 7,
        name: 'Chameleon Active Skill',
        description: 'Kỹ năng chủ động của Chameleon, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 8,
        name: 'Ferret Active Skill',
        description: 'Kỹ năng chủ động của Ferret, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.HighestHP
    },
    {
        pet_id: 9,
        name: 'Boar Active Skill',
        description: 'Kỹ năng chủ động của Boar, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 10,
        name: 'Ram Sheep Active Skill',
        description: 'Kỹ năng chủ động của Ram Sheep, gây 100% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Farthest
    },

    //Uncommon
    {
        pet_id: 11,
        name: 'Panda Active Skill',
        description: 'Kỹ năng chủ động của Panda, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 12,
        name: 'Pig Active Skill',
        description: 'Kỹ năng chủ động của Pig, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 105,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 13,
        name: 'Salamander Active Skill',
        description: 'Kỹ năng chủ động của Salamander, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 14,
        name: 'Fox Active Skill',
        description: 'Kỹ năng chủ động của Fox, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 15,
        name: 'Butterfly Active Skill',
        description: 'Kỹ năng chủ động của Butterfly, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 16,
        name: 'Dolphin Active Skill',
        description: 'Kỹ năng chủ động của Dolphin, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 17,
        name: 'Scorpion Active Skill',
        description: 'Kỹ năng chủ động của Scorpion, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 18,
        name: 'Eagle Active Skill',
        description: 'Kỹ năng chủ động của Eagle, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 105,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 19,
        name: 'Dino Active Skill',
        description: 'Kỹ năng chủ động của Dino, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 20,
        name: 'Lion Active Skill',
        description: 'Kỹ năng chủ động của Lion, gây 110% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 105,
        attack_position: ETargetPosition.Nearest
    },

    //Rare
    {
        pet_id: 21,
        name: 'Dread Porcupine Active Skill',
        description: 'Kỹ năng chủ động của Dread Porcupine, gây 125% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 115,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 22,
        name: 'Owl Active Skill',
        description: 'Kỹ năng chủ động của Owl, gây 125% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 70,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 23,
        name: 'Bee Active Skill',
        description: 'Kỹ năng chủ động của Bee, gây 125% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 115,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 24,
        name: 'Penguin Active Skill',
        description: 'Kỹ năng chủ động của Penguin, gây 125% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 115,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 25,
        name: 'Seahorse Active Skill',
        description: 'Kỹ năng chủ động của Seahorse, gây 125% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 115,
        attack_position: ETargetPosition.Farthest
    },

    //Epic
    {
        pet_id: 26,
        name: 'Basilisk Active Skill',
        description: 'Kỹ năng chủ động của Basilisk, gây 130% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 75,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 27,
        name: 'Cerberus Active Skill',
        description: 'Kỹ năng chủ động của Cerberus, gây 130% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 75,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 28,
        name: 'Dragon Active Skill',
        description: 'Kỹ năng chủ động của Dragon, gây 130% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 29,
        name: 'Griffin Active Skill',
        description: 'Kỹ năng chủ động của Griffin, gây 130% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 125,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 30,
        name: 'Hydra Active Skill',
        description: 'Kỹ năng chủ động của Hydra, gây 130% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 75,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 31,
        name: 'Phoenix Active Skill',
        description: 'Kỹ năng chủ động của Phoenix, gây 130% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 32,
        name: 'Unicorn Active Skill',
        description: 'Kỹ năng chủ động của Unicorn, gây 130% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 33,
        name: 'Manticore Active Skill',
        description: 'Kỹ năng chủ động của Manticore, gây 130% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.Nearest
    },

    //Legendary
    {
        pet_id: 34,
        name: 'Lunar Rat Active Skill',
        description: 'Kỹ năng chủ động của Lunar Rat, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 35,
        name: 'Lunar Ox Active Skill',
        description: 'Kỹ năng chủ động của Lunar Ox, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 36,
        name: 'Lunar Tiger Active Skill',
        description: 'Kỹ năng chủ động của Lunar Tiger, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 37,
        name: 'Lunar Cat Active Skill',
        description: 'Kỹ năng chủ động của Lunar Cat, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 140,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 38,
        name: 'Lunar Dragon Active Skill',
        description: 'Kỹ năng chủ động của Lunar Dragon, gây 135% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 90,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 39,
        name: 'Lunar Snake Active Skill',
        description: 'Kỹ năng chủ động của Lunar Snake, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 140,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 40,
        name: 'Lunar Horse Active Skill',
        description: 'Kỹ năng chủ động của Lunar Horse, gây 135% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 41,
        name: 'Lunar Goat Active Skill',
        description: 'Kỹ năng chủ động của Lunar Goat, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 140,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 42,
        name: 'Lunar Monkey Active Skill',
        description: 'Kỹ năng chủ động của Lunar Monkey, gây 135% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 43,
        name: 'Lunar Rooster Active Skill',
        description: 'Kỹ năng chủ động của Lunar Rooster, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 90,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 44,
        name: 'Lunar Dog Active Skill',
        description: 'Kỹ năng chủ động của Lunar Dog, gây 135% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 45,
        name: 'Lunar Pig Active Skill',
        description: 'Kỹ năng chủ động của Lunar Pig, gây 135% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },

    //Mythic
    {
        pet_id: 46,
        name: 'Aries Active Skill',
        description: 'Kỹ năng chủ động của Aries, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 47,
        name: 'Taurus Active Skill',
        description: 'Kỹ năng chủ động của Taurus, gây 145% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 48,
        name: 'Gemini Active Skill',
        description: 'Kỹ năng chủ động của Gemini, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 49,
        name: 'Cancer Active Skill',
        description: 'Kỹ năng chủ động của Cancer, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 50,
        name: 'Leo Active Skill',
        description: 'Kỹ năng chủ động của Leo, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 51,
        name: 'Virgo Active Skill',
        description: 'Kỹ năng chủ động của Virgo, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 120,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 52,
        name: 'Libra Active Skill',
        description: 'Kỹ năng chủ động của Libra, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.HighestHP
    },
    {
        pet_id: 53,
        name: 'Scorpius Active Skill',
        description: 'Kỹ năng chủ động của Scorpius, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 54,
        name: 'Sagittarius Active Skill',
        description: 'Kỹ năng chủ động của Sagittarius, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 55,
        name: 'Capricorn Active Skill',
        description: 'Kỹ năng chủ động của Capricorn, gây 145% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 56,
        name: 'Aquarius Active Skill',
        description: 'Kỹ năng chủ động của Aquarius, gây 145% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 57,
        name: 'Pisces Active Skill',
        description: 'Kỹ năng chủ động của Pisces, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 58,
        name: 'Azure Dragon Active Skill',
        description: 'Kỹ năng chủ động của Azure Dragon, gây 155% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 59,
        name: 'White Tiger Active Skill',
        description: 'Kỹ năng chủ động của White Tiger, gây 155% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 170,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 60,
        name: 'Vermilion Bird Active Skill',
        description: 'Kỹ năng chủ động của Vermilion Bird, gây 155% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 61,
        name: 'Black Tortoise Snake Active Skill',
        description: 'Kỹ năng chủ động của Black Tortoise Snake, gây 155% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Hybrid,
        damage: 170,
        attack_position: ETargetPosition.Nearest
    }
];
