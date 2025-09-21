import { ERarity, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type RaritySeed = {
    id: number;
    name: string;
    mezon_emoji_id: string;
    type: ERarity;
    catch_rate: number;
};

export const seedRarities = async () => {
    for (const rarity of raritySeedData) {
        await prisma.rarity.upsert({
            where: { id: rarity.id }, 
            update: {
                name: rarity.name,
                mezon_emoji_id: rarity.mezon_emoji_id,
                type: rarity.type,
                catch_rate: rarity.catch_rate
            },
            create: {
                id: rarity.id,  
                name: rarity.name,
                mezon_emoji_id: rarity.mezon_emoji_id,
                type: rarity.type,
                catch_rate: rarity.catch_rate
            }
        });
    }
};

const raritySeedData: RaritySeed[] = [
    {
        id: 1,
        name: 'Common',
        mezon_emoji_id: '7359939378409694674',
        type: ERarity.Common,
        catch_rate: 0.6
    },
    {
        id: 2,
        name: 'Uncommon',
        mezon_emoji_id: '7359939419336614752',
        type: ERarity.Uncommon,
        catch_rate: 0.28
    },
    {
        id: 3,
        name: 'Rare',
        mezon_emoji_id: '7359939472574394074',
        type: ERarity.Rare,
        catch_rate: 0.08
    },
    {
        id: 4,
        name: 'Epic',
        mezon_emoji_id: '7359939510142173438',
        type: ERarity.Epic,
        catch_rate: 0.03
    },
    {
        id: 5,
        name: 'Legendary',
        mezon_emoji_id: '7359939601354159134',
        type: ERarity.Legendary,
        catch_rate: 0.008
    },
    {
        id: 6,
        name: 'Mythic',
        mezon_emoji_id: '7359939551621409047',
        type: ERarity.Mythic,
        catch_rate: 0.002
    },
    {
        id: 7,
        name: 'Limited',
        mezon_emoji_id: '7359939845555570189',
        type: ERarity.Limited,
        catch_rate: 0
    }
];
