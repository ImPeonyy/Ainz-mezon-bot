import { PrismaClient } from '@prisma/client';
import { raritySeedData } from './data/rarities';

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

async function main() {
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
