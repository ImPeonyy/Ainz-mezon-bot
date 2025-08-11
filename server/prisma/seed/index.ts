import {
    seedActiveSkill,
    seedAutoAttack,
    seedPets,
    seedRarities,
    seedStatistics
} from './data';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // await seedStatistics();
    // await seedRarities();
    // await seedPets();
    // await seedAutoAttack();
    // await seedActiveSkill();
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
