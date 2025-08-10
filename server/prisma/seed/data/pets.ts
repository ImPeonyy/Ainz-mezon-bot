import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type PetSeed = {
    name: string;
    mezon_emoji_id: string;
    description: string;
    statistic_id: number;
    rarity_id: number;
};

export const seedPets = async () => {
    for (const pet of petSeedData) {
        const existing = await prisma.pet.findFirst({
            where: { name: pet.name }
        });

        if (!existing) {
            await prisma.pet.create({
                data: {
                    name: pet.name,
                    mezon_emoji_id: pet.mezon_emoji_id,
                    description: pet.description,
                    statistic_id: pet.statistic_id,
                    rarity_id: pet.rarity_id
                }
            });
        } else {
            await prisma.pet.update({
                where: { id: existing.id },
                data: {
                    mezon_emoji_id: pet.mezon_emoji_id,
                    description: pet.description,
                    statistic_id: pet.statistic_id,
                    rarity_id: pet.rarity_id
                }
            });
        }
    }
};

export const petSeedData: PetSeed[] = [
    // Mythical Creatures (Epic)
    {
        name: 'Basilisk',
        mezon_emoji_id: '7359855035740708032',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Cerberus',
        mezon_emoji_id: '7359855111719414313',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Dragon',
        mezon_emoji_id: '7359855161466150856',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Griffin',
        mezon_emoji_id: '7359855223036807590',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Hydra',
        mezon_emoji_id: '7359855260169629201',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Phoenix',
        mezon_emoji_id: '7359855392921938838',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Unicorn',
        mezon_emoji_id: '7359855432450657385',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Manticore',
        mezon_emoji_id: '7359858743165326878',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },

    // Chinese Zodiac (Legendary)
    {
        name: 'Lunar Rat',
        mezon_emoji_id: '7359938752431810782',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Ox',
        mezon_emoji_id: '7359938804694634440',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Tiger',
        mezon_emoji_id: '7359938837038813309',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Cat',
        mezon_emoji_id: '7359938879013831780',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Dragon',
        mezon_emoji_id: '7359938940833032841',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Snake',
        mezon_emoji_id: '7359939001056393190',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Horse',
        mezon_emoji_id: '7359939033460169061',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Goat',
        mezon_emoji_id: '7359939079661840579',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Monkey',
        mezon_emoji_id: '7359939117018127739',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Rooster',
        mezon_emoji_id: '7359939230398954679',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Dog',
        mezon_emoji_id: '7359939274893697177',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Pig',
        mezon_emoji_id: '7359939317916230055',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },

    // Zodiac Sign (Mythic)
    {
        name: 'Aries',
        mezon_emoji_id: '7359862840344976491',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Taurus',
        mezon_emoji_id: '7359863322598722629',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Gemini',
        mezon_emoji_id: '7359863048722082271',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Cancer',
        mezon_emoji_id: '7359862939396115055',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Leo',
        mezon_emoji_id: '7359863083358580971',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Virgo',
        mezon_emoji_id: '7359863373819759972',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Libra',
        mezon_emoji_id: '7359863123741186292',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Scorpius',
        mezon_emoji_id: '7359863273097857497',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Sagittarius',
        mezon_emoji_id: '7359863229022549423',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Capricorn',
        mezon_emoji_id: '7359862990820691942',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Aquarius',
        mezon_emoji_id: '7359862895473998969',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Pisces',
        mezon_emoji_id: '7359863177060978875',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },

    // Four Symbols
    {
        name: 'Azure Dragon',
        mezon_emoji_id: '7359865845194434505',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    },
    {
        name: 'White Tiger',
        mezon_emoji_id: '7359877318742843139',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    },
    {
        name: 'Vermilion Bird',
        mezon_emoji_id: '7359866087154359745',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    },
    {
        name: 'Black Tortoise Snake',
        mezon_emoji_id: '7359866010433602674',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    }
];
