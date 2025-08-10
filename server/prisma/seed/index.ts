import { raritySeedData, statisticsSeedData } from './data';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRarities() {
    for (const rarity of raritySeedData) {
        const existing = await prisma.rarity.findFirst({
            where: { name: rarity.name }
        });

        if (!existing) {
            await prisma.rarity.create({
                data: {
                    name: rarity.name,
                    mezon_emoji_id: rarity.mezon_emoji_id,
                    type: rarity.type ?? null,
                    catch_rate: rarity.catch_rate
                }
            });
        } else {
            await prisma.rarity.update({
                where: { id: existing.id },
                data: {
                    mezon_emoji_id: rarity.mezon_emoji_id,
                    type: rarity.type ?? null,
                    catch_rate: rarity.catch_rate
                }
            });
        }
    }
}

async function seedStatistics() {
    for (const statistic of statisticsSeedData) {
        const existing = await prisma.statistics.findFirst({
            where: { name: statistic.name }
        });

        if (!existing) {
            await prisma.statistics.create({
                data: {
                    name: statistic.name,
                    attack_type: statistic.attack_type,
                    role: statistic.role,
                    element_type: statistic.element_type ?? null,
                    rarity: statistic.rarity,
                    hp: statistic.hp,
                    mana: statistic.mana,
                    ad: statistic.ad,
                    ap: statistic.ap,
                    ar: statistic.ar,
                    mr: statistic.mr,
                    hp_per_level: statistic.hp_per_level,
                    ad_per_level: statistic.ad_per_level,
                    ap_per_level: statistic.ap_per_level,
                    ar_per_level: statistic.ar_per_level,
                    mr_per_level: statistic.mr_per_level
                }
            });
        } else {
            await prisma.statistics.update({
                where: { id: existing.id },
                data: {
                    name: statistic.name,
                    attack_type: statistic.attack_type,
                    role: statistic.role,
                    element_type: statistic.element_type ?? null,
                    rarity: statistic.rarity,
                    hp: statistic.hp,
                    mana: statistic.mana,
                    ad: statistic.ad,
                    ap: statistic.ap,
                    ar: statistic.ar,
                    mr: statistic.mr,
                    hp_per_level: statistic.hp_per_level,
                    ad_per_level: statistic.ad_per_level,
                    ap_per_level: statistic.ap_per_level,
                    ar_per_level: statistic.ar_per_level,
                    mr_per_level: statistic.mr_per_level
                }
            });
        }
    }
}

async function main() {
    await seedStatistics();
    await seedRarities();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
