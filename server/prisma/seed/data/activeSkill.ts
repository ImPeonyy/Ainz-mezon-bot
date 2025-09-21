import { EScalingType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ActiveSkillSeed = {
    id: number;
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
        await prisma.activeSkill.upsert({
            where: { id: activeSkill.id },
            update: {
                pet_id: activeSkill.pet_id,
                name: activeSkill.name,
                description: activeSkill.description,
                mana_cost: activeSkill.mana_cost,
                scaling_type: activeSkill.scaling_type,
                damage: activeSkill.damage,
                attack_position: activeSkill.attack_position
            },
            create: {
                id: activeSkill.id,
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
};

export const activeSkillSeedData: ActiveSkillSeed[] = [
    //Common
    {
        id: 1,
        pet_id: 1,
        name: 'Tusker Charge',
        description: 'Elephant charges with sharp tusks, dealing 100% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 2,
        pet_id: 2,
        name: 'Horn Pierce',
        description: 'Rhinoceros pierces with sharp horn from distance, dealing 100% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 3,
        pet_id: 3,
        name: 'Bandit Strike',
        description: 'Raccoon strikes sneakily like a bandit, dealing 100% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 4,
        pet_id: 4,
        name: 'Tongue Lash',
        description: 'Frog lashes with long tongue like a whip, dealing 100% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Random
    },
    {
        id: 5,
        pet_id: 5,
        name: 'Eucalyptus Burst',
        description: 'Koala releases magical eucalyptus energy, dealing 100% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 6,
        pet_id: 6,
        name: 'Lucky Hop',
        description: 'Rabbit hops luckily with magical power, dealing 100% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 7,
        pet_id: 7,
        name: 'Color Shift',
        description: 'Chameleon changes color to camouflage and attack, dealing 100% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 8,
        pet_id: 8,
        name: 'Weasel War Dance',
        description: 'Ferret performs agile war dance, dealing 100% ATK to Highest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.HighestHP
    },
    {
        id: 9,
        pet_id: 9,
        name: 'Wild Charge',
        description: 'Boar charges fiercely in head-on attack, dealing 100% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 10,
        pet_id: 10,
        name: 'Headbutt Storm',
        description: 'Ram Sheep creates powerful headbutt storm, dealing 100% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 100,
        attack_position: ETargetPosition.Farthest
    },

    //Uncommon
    {
        id: 11,
        pet_id: 11,
        name: 'Bamboo Strike',
        description: 'Panda launches bamboo-themed magical attack, dealing 105% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 12,
        pet_id: 12,
        name: 'Mud Roll',
        description: 'Pig rolls in mud for effective physical attack, dealing 105% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 105,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 13,
        pet_id: 13,
        name: 'Fire Breath',
        description: 'Salamander breathes fire from long distance, dealing 105% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 14,
        pet_id: 14,
        name: 'Fox Fire',
        description: 'Fox summons mystical fire targeting weak enemies, dealing 105% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 15,
        pet_id: 15,
        name: 'Pollen Storm',
        description: 'Butterfly creates magical pollen storm, dealing 105% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.Random
    },
    {
        id: 16,
        pet_id: 16,
        name: 'Sonar Blast',
        description: 'Dolphin emits powerful sonar waves, dealing 105% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 17,
        pet_id: 17,
        name: 'Venom Sting',
        description: 'Scorpion stings enemies with venomous tail, dealing 105% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 18,
        pet_id: 18,
        name: 'Sky Dive',
        description: 'Eagle dives from high altitude to attack, dealing 105% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 105,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 19,
        pet_id: 19,
        name: 'Prehistoric Roar',
        description: 'Dino roars with prehistoric cry, dealing 105% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 105,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 20,
        pet_id: 20,
        name: "King's Pounce",
        description: 'Lion performs king of jungle pounce, dealing 105% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 105,
        attack_position: ETargetPosition.Nearest
    },

    //Rare
    {
        id: 21,
        pet_id: 21,
        name: 'Spike Barrage',
        description: 'Dread Porcupine shoots barrage of sharp spikes, dealing 115% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 115,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 22,
        pet_id: 22,
        name: 'Night Vision',
        description: 'Owl uses night vision to attack all enemies, dealing 70% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 70,
        attack_position: ETargetPosition.All
    },
    {
        id: 23,
        pet_id: 23,
        name: 'Honey Swarm',
        description: 'Bee summons honey swarm to attack, dealing 115% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 115,
        attack_position: ETargetPosition.Random
    },
    {
        id: 24,
        pet_id: 24,
        name: 'Ice Slide',
        description: 'Penguin slides on ice to attack, dealing 115% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 115,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 25,
        pet_id: 25,
        name: 'Ocean Current',
        description: 'Seahorse creates powerful ocean current, dealing 115% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 115,
        attack_position: ETargetPosition.Farthest
    },

    //Epic
    {
        id: 26,
        pet_id: 26,
        name: 'Petrifying Gaze',
        description: 'Basilisk stares with petrifying gaze, dealing 75% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 75,
        attack_position: ETargetPosition.All
    },
    {
        id: 27,
        pet_id: 27,
        name: 'Triple Bite',
        description: 'Cerberus bites with all three heads simultaneously, dealing 75% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 75,
        attack_position: ETargetPosition.All
    },
    {
        id: 28,
        pet_id: 28,
        name: 'Dragon Breath',
        description: 'Dragon breathes devastating fire breath, dealing 125% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 29,
        pet_id: 29,
        name: 'Thunder Strike',
        description: 'Griffin summons thunder strike from above, dealing 125% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 125,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 30,
        pet_id: 30,
        name: 'Multi-Headed Assault',
        description: 'Hydra attacks with multiple heads simultaneously, dealing 75% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 75,
        attack_position: ETargetPosition.All
    },
    {
        id: 31,
        pet_id: 31,
        name: 'Rebirth Flames',
        description: 'Phoenix rises with devastating flames, dealing 125% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.Random
    },
    {
        id: 32,
        pet_id: 32,
        name: 'Horn of Purity',
        description: 'Unicorn pierces enemies with pure horn, dealing 125% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 33,
        pet_id: 33,
        name: 'Venomous Tail',
        description: 'Manticore strikes with deadly venomous tail, dealing 125% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 125,
        attack_position: ETargetPosition.Nearest
    },

    //Legendary
    {
        id: 34,
        pet_id: 34,
        name: 'Moon Shadow',
        description: 'Lunar Rat hides in lunar shadows, dealing 140% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 35,
        pet_id: 35,
        name: 'Celestial Charge',
        description: 'Lunar Ox charges with celestial power, dealing 140% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 36,
        pet_id: 36,
        name: 'Stellar Pounce',
        description: 'Lunar Tiger pounces with stellar power, dealing 140% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 37,
        pet_id: 37,
        name: 'Cosmic Whiskers',
        description: 'Lunar Cat uses cosmic whiskers to attack, dealing 140% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 140,
        attack_position: ETargetPosition.Random
    },
    {
        id: 38,
        pet_id: 38,
        name: 'Astral Breath',
        description: 'Lunar Dragon breathes astral breath, dealing 90% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 90,
        attack_position: ETargetPosition.All
    },
    {
        id: 39,
        pet_id: 39,
        name: 'Eclipse Coil',
        description: 'Lunar Snake coils in eclipse, dealing 140% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 140,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 40,
        pet_id: 40,
        name: 'Galactic Gallop',
        description: 'Lunar Horse gallops through galaxy, dealing 140% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 41,
        pet_id: 41,
        name: 'Nebula Headbutt',
        description: 'Lunar Goat headbutts with nebula power, dealing 140% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 140,
        attack_position: ETargetPosition.Random
    },
    {
        id: 42,
        pet_id: 42,
        name: 'Stellar Swipe',
        description: 'Lunar Monkey swipes with stellar power, dealing 140% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 43,
        pet_id: 43,
        name: 'Dawn Crow',
        description: 'Lunar Rooster crows to announce dawn, dealing 90% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 90,
        attack_position: ETargetPosition.All
    },
    {
        id: 44,
        pet_id: 44,
        name: 'Loyalty Bite',
        description: 'Lunar Dog bites with absolute loyalty, dealing 140% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Random
    },
    {
        id: 45,
        pet_id: 45,
        name: 'Fortune Rush',
        description: 'Lunar Pig charges with fortune, dealing 140% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 140,
        attack_position: ETargetPosition.Nearest
    },

    //Mythic
    {
        id: 46,
        pet_id: 46,
        name: "Ram's Fury",
        description: 'Aries unleashes ram fury, dealing 150% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.Random
    },
    {
        id: 47,
        pet_id: 47,
        name: "Bull's Stampede",
        description: 'Taurus creates bull stampede, dealing 150% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 48,
        pet_id: 48,
        name: 'Twin Strike',
        description: 'Gemini attacks with twin power, dealing 100% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.All
    },
    {
        id: 49,
        pet_id: 49,
        name: "Crab's Clamp",
        description: 'Cancer clamps tightly with crab claws, dealing 150% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 50,
        pet_id: 50,
        name: "Lion's Pride",
        description: 'Leo displays lion pride, dealing 150% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 51,
        pet_id: 51,
        name: "Maiden's Blessing",
        description: 'Virgo bestows maiden blessing, dealing 120% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 120,
        attack_position: ETargetPosition.All
    },
    {
        id: 52,
        pet_id: 52,
        name: 'Balance Strike',
        description: 'Libra attacks with perfect balance, dealing 150% ATK to Highest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.HighestHP
    },
    {
        id: 53,
        pet_id: 53,
        name: "Scorpion's Sting",
        description: 'Scorpius stings with scorpion venom, dealing 150% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Random
    },
    {
        id: 54,
        pet_id: 54,
        name: "Archer's Shot",
        description: 'Sagittarius shoots archer arrow, dealing 150% ATK to Farthest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Farthest
    },
    {
        id: 55,
        pet_id: 55,
        name: "Goat's Charge",
        description: 'Capricorn charges like mountain goat, dealing 150% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 150,
        attack_position: ETargetPosition.Nearest
    },
    {
        id: 56,
        pet_id: 56,
        name: 'Water Bearer',
        description: 'Aquarius carries water from heaven, dealing 150% ATK to Random target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.Random
    },
    {
        id: 57,
        pet_id: 57,
        name: 'Twin Fish',
        description: 'Pisces swims like twin fish, dealing 150% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 58,
        pet_id: 58,
        name: 'Azure Storm',
        description: 'Azure Dragon creates azure storm, dealing 150% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.All
    },
    {
        id: 59,
        pet_id: 59,
        name: 'White Fury',
        description: 'White Tiger unleashes white fury, dealing 170% ATK to Lowest HP target',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 170,
        attack_position: ETargetPosition.LowestHP
    },
    {
        id: 60,
        pet_id: 60,
        name: 'Solar Flare',
        description:
            'Unleashes a burst of searing fire, engulfing enemies in radiant flames, dealing 150% ATK to All targets',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 150,
        attack_position: ETargetPosition.All
    },
    {
        id: 61,
        pet_id: 61,
        name: "Serpent's Eclipse",
        description: 'Black Tortoise Snake Enshrouds the battlefield in darkness, dealing 170% ATK to Nearest target',
        mana_cost: 100,
        scaling_type: EScalingType.Hybrid,
        damage: 170,
        attack_position: ETargetPosition.Nearest
    }
];
