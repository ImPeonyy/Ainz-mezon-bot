import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type PetSeed = {
    name: string;
    mezon_emoji_id: string;
    avatar: string;
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
                    avatar: pet.avatar,
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
                    avatar: pet.avatar,
                    description: pet.description,
                    statistic_id: pet.statistic_id,
                    rarity_id: pet.rarity_id
                }
            });
        }
    }
};

export const petSeedData: PetSeed[] = [
    //Common
    {
        name: 'Elephant',
        mezon_emoji_id: '7364683133987522279',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_elephant-ekjvfQrZCB9CmTGiVy8LhjgGtY4yoX.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Rhinoceros',
        mezon_emoji_id: '7364683316891742229',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_rhinoceros-fVog9TqFDWknzbtXJuUS0IUDSV8v5R.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Raccoon',
        mezon_emoji_id: '7364683587207230928',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bmage%5D_raccoon-0DbFgJVECKHRKLyTtNbS75THV24hT8.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Frog',
        mezon_emoji_id: '7364683675713254522',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/frog_394697-KvQQZh7ULL5eRg4xeDHnqF1LGqG57I.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Koala',
        mezon_emoji_id: '7364683826746947317',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_koala-ehe1NSOP6MfDZ8wEN9nMm7mGW56oF6.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Rabbit',
        mezon_emoji_id: '7364683964909625004',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_rabbit-F783KAVJpkQWf93h5nWLH9nZPflNAK.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Chameleon',
        mezon_emoji_id: '7364684113642914837',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_chameleon-z8303rGekumDw0vrqshetKuEhSfDMF.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Ferret',
        mezon_emoji_id: '7364684218516359305',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_ferret2-U8ZnftkD0BETti9fVwaOwgJZlYPvAH.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Boar',
        mezon_emoji_id: '7364684386591267766',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_boar-XU9Nf6IqJvbEHb5pG0FCXaSZsNm04h.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Ram Sheep',
        mezon_emoji_id: '7364684441621524749',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_ramsheep-vZuUkjctw8vkjezu9SGLCrHqsqvidz.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },

    //Uncommon
    {
        name: 'Panda',
        mezon_emoji_id: '7364686710908002637',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_panda-XqftpC4OeuB7iBGNGTBEt0t5uhJ53d.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Pig',
        mezon_emoji_id: '7364686809690789368',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_pig-FEW3ACVikLRDpiesHHdA1er1oHnDze.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Salamander',
        mezon_emoji_id: '7364686968840447654',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bmage%5D_salamander-RD16XiTdpvJ9bsefBvxa3dQODHlSzC.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Fox',
        mezon_emoji_id: '7364686917436380728',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bmage%5D_fox-OzMjCqokE40mQTCFEv5KAQHHFhILjU.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Butterfly',
        mezon_emoji_id: '7364687323743528711',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_butterfly-yzsUsYyjzLe9X4HLDtPx5TXA81PqLV.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Dolphin',
        mezon_emoji_id: '7364687366039926281',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_dolphin-N8gLgyNLccjFXVR79tCCphq5BtyvWJ.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Scorpion',
        mezon_emoji_id: '7364687596644916336',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_scorpion-cmIXzXx9Ky5mVeARNw1poFwgYCehfZ.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Eagle',
        mezon_emoji_id: '7364688014495286891',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_eagle%20%281%29-viKiQn0QRplkskmqKLK8oSP0xZnrlo.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Dino',
        mezon_emoji_id: '7364691858330166336',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_dino-2GECc6dKom1UFPY0lLUAXI4MJJScct.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    {
        name: 'Lion',
        mezon_emoji_id: '7364691886664733553',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_lion-pw0zjegKyywLQnOS5XXl4embOtjP1n.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2
    },
    //Rare
    {
        name: 'Dread Porcupine',
        mezon_emoji_id: '7366467188352194458',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Brare%5D_Dread%20Porcupine-h703mWSPMkJPEtKdRA4KV5RdQAR7cl.png',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3
    },
    {
        name: 'Owl',
        mezon_emoji_id: '7366467290973474859',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_owl-bXG8pOGXdARWtlN9cYRoaK9WrjGKlE.png',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3
    },
    {
        name: 'Bee',
        mezon_emoji_id: '7366467319866577408',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/bee-ffJ7DZfpzQ9iDBltbaNLnRQaUmkwIG.png',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3
    },
    {
        name: 'Penguin',
        mezon_emoji_id: '7366467369762305576',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/penguin-xbi5FbQyB5WSQQ8F2l563gzf58PllT.png',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3
    },
    {
        name: 'Seahorse',
        mezon_emoji_id: '7366467424187239598',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/seahorse-SVFiEhIlQhaoZllZxtEEq5ntU4L4GO.png',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3
    },

    // Mythical Creatures (Epic)
    {
        name: 'Basilisk',
        mezon_emoji_id: '7359855035740708032',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_basilisk%20-imxfTtYjVt9bnhsQWBsLlbJUzXxhXS.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Cerberus',
        mezon_emoji_id: '7359855111719414313',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_cerberus-rvUab4f1uCikfqe72wu1z5C6Ii6mRm.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Dragon',
        mezon_emoji_id: '7359855161466150856',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_dragon-6o6INJPBo4J3Ql3RFQyqpam3ZywcbS.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Griffin',
        mezon_emoji_id: '7359855223036807590',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_griffin-raauOPaKgYz3KZfsHIsIC8o3EYvxpe.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Hydra',
        mezon_emoji_id: '7359855260169629201',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_hydra-c43hB9Sx17lEnHwL1hWGUpeM9Bw277.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Phoenix',
        mezon_emoji_id: '7359855392921938838',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_phoenix-wRhG0BoW6UE4tW41xJ6fwuW2Cq0Dxo.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Unicorn',
        mezon_emoji_id: '7359855432450657385',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_unicorn-KRwfznsfxxI6Khkyy7eraVygVvibpR.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },
    {
        name: 'Manticore',
        mezon_emoji_id: '7359858743165326878',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/_epic__manticore-removebg-preview%20%281%29-Sry14b1xK8j0nw2yuszgwQECxjA5DS.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4
    },

    // Chinese Zodiac (Legendary)
    {
        name: 'Lunar Rat',
        mezon_emoji_id: '7359938752431810782',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/ti-DpJBKvTtoTIt3DM7QXxQnKfRvpWD09.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Ox',
        mezon_emoji_id: '7359938804694634440',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/suu-m4i98wCrEa5Relik1CY8Mur9tBA73c.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Tiger',
        mezon_emoji_id: '7359938837038813309',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/dan-Zq4uMMA6c2Y0rAGWCbA6ffjsdyQobq.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Cat',
        mezon_emoji_id: '7359938879013831780',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/mao-5aUd3VwVG5jOy9RF4jaHzQENsCTFb9.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Dragon',
        mezon_emoji_id: '7359938940833032841',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/thin-zcu9GCzgNzSXcOUp9FSdMViXqlTGBV.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Snake',
        mezon_emoji_id: '7359939001056393190',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/ty-2HcxPVQ4NTol9dgPYdBd1XU3f2h9FU.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Horse',
        mezon_emoji_id: '7359939033460169061',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/ngo-t5CpoZCcmuF0P3BBp5u808noob5unW.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Goat',
        mezon_emoji_id: '7359939079661840579',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/mui-1AWMzXclOzg15SGccs6Uf5T50VL6Ia.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Monkey',
        mezon_emoji_id: '7359939117018127739',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/than-zeldBp2hyKhcRImm65S5PSZHbDzqE8.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Rooster',
        mezon_emoji_id: '7359939230398954679',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/dau-FL4brruJexuYKM1cN4le1laQPZNpim.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Dog',
        mezon_emoji_id: '7359939274893697177',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/tuat-vyl2rNo2wz1GBmX2bdWF0cMwtqucAV.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },
    {
        name: 'Lunar Pig',
        mezon_emoji_id: '7359939317916230055',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/hoi-Z4DXCW1YVtut4RraDUYTxhSVHrMliL.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5
    },

    // Zodiac Sign (Mythic)
    {
        name: 'Aries',
        mezon_emoji_id: '7359862840344976491',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/aries-GsKgMfIJmRJHcOYd327AAEH9i3CtHs.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Taurus',
        mezon_emoji_id: '7359863322598722629',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/taurus-arDqNAk5KZzBwnvN306GPlLetP8QZv.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Gemini',
        mezon_emoji_id: '7359863048722082271',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/gemini-VeczBh96rTZzBBEMLF1QvxUBOYoriA.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Cancer',
        mezon_emoji_id: '7359862939396115055',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/cancer-WfHuAIk0T06ApUAR65kVbkO7mE5UVE.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Leo',
        mezon_emoji_id: '7359863083358580971',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/leo-lCwWgLAme2m2aJkUDoI0MveK9T2QPJ.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Virgo',
        mezon_emoji_id: '7359863373819759972',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/virgo-1n3qmVSWnRbRA8NOmci9ik2vnlCp9A.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Libra',
        mezon_emoji_id: '7359863123741186292',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/libra-MJ4qe59FQkQiPZj63zPHGttGA5ZjpI.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Scorpius',
        mezon_emoji_id: '7359863273097857497',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/scorpio-AxwzW4i5CbPjagnHTPZkMNQUGbMnAO.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Sagittarius',
        mezon_emoji_id: '7359863229022549423',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/sagittarius-IXZ3ORK3HpaFpA8rWcAFUMLgVzoE1m.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Capricorn',
        mezon_emoji_id: '7359862990820691942',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/capricorn-yWXcNKV0kfLqFZhtxZkmEocQ0lE98z.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Aquarius',
        mezon_emoji_id: '7359862895473998969',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/aquarius-MvI2sOdv0hBk99vdtvqtxwedyIW3F0.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },
    {
        name: 'Pisces',
        mezon_emoji_id: '7359863177060978875',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/pisces-MEmM0hKzI4MG1t5MUucACgsIceQ8DL.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6
    },

    // Four Symbols
    {
        name: 'Azure Dragon',
        mezon_emoji_id: '7359865845194434505',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Blimited%5D_Azure%20Dragon-isZ2o2mqnTyybaZZK9GuD4UeN0Lzn8.png',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    },
    {
        name: 'White Tiger',
        mezon_emoji_id: '7359877318742843139',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/white_tiger-BfDX5sSwq98az5A404rX6aeba2hyCB.png',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    },
    {
        name: 'Vermilion Bird',
        mezon_emoji_id: '7359866087154359745',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Blimited%5D_Vermilion%20Bird-sYTVXTXsSWWI2VKlcKM3xIQJYj0vH1.png',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    },
    {
        name: 'Black Tortoise Snake',
        mezon_emoji_id: '7359866010433602674',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Blimited%5D_Black%20Tortoise%20%26%20Snake-QzeeX7vi1DcR1uK0lguOBQHIN8mCcl.png',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7
    }
];
