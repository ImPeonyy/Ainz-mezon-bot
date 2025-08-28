import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type PetSeed = {
    name: string;
    mezon_emoji_id: string;
    description: string;
    statistic_id: number;
    rarity_id: number;
    avatar: string;
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
    //Common
    {
        name: 'Elephant',
        mezon_emoji_id: '7364683133987522279',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_elephant-ekjvfQrZCB9CmTGiVy8LhjgGtY4yoX.png'
    },
    {
        name: 'Rhinoceros',
        mezon_emoji_id: '7364683316891742229',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_rhinoceros-fVog9TqFDWknzbtXJuUS0IUDSV8v5R.png'
    },
    {
        name: 'Raccoon',
        mezon_emoji_id: '7364683587207230928',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bmage%5D_raccoon-0DbFgJVECKHRKLyTtNbS75THV24hT8.png'
    },
    {
        name: 'Frog',
        mezon_emoji_id: '7364683675713254522',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/frog_394697-KvQQZh7ULL5eRg4xeDHnqF1LGqG57I.png'
    },
    {
        name: 'Koala',
        mezon_emoji_id: '7364683826746947317',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_koala-ehe1NSOP6MfDZ8wEN9nMm7mGW56oF6.png'
    },
    {
        name: 'Rabbit',
        mezon_emoji_id: '7364683964909625004',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_rabbit-F783KAVJpkQWf93h5nWLH9nZPflNAK.png'
    },
    {
        name: 'Chameleon',
        mezon_emoji_id: '7364684113642914837',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_chameleon-z8303rGekumDw0vrqshetKuEhSfDMF.png'
    },
    {
        name: 'Ferret',
        mezon_emoji_id: '7364684218516359305',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_ferret2-U8ZnftkD0BETti9fVwaOwgJZlYPvAH.png'
    },
    {
        name: 'Boar',
        mezon_emoji_id: '7364684386591267766',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_boar-XU9Nf6IqJvbEHb5pG0FCXaSZsNm04h.png'
    },
    {
        name: 'Ram Sheep',
        mezon_emoji_id: '7364684441621524749',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_ramsheep-vZuUkjctw8vkjezu9SGLCrHqsqvidz.png'
    },

    //Uncommon
    {
        name: 'Panda',
        mezon_emoji_id: '7364686710908002637',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_panda-XqftpC4OeuB7iBGNGTBEt0t5uhJ53d.png'
    },
    {
        name: 'Pig',
        mezon_emoji_id: '7364686809690789368',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Btank%5D_pig-FEW3ACVikLRDpiesHHdA1er1oHnDze.png'
    },
    {
        name: 'Salamander',
        mezon_emoji_id: '7364686968840447654',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bmage%5D_salamander-RD16XiTdpvJ9bsefBvxa3dQODHlSzC.png'
    },
    {
        name: 'Fox',
        mezon_emoji_id: '7364686917436380728',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bmage%5D_fox-OzMjCqokE40mQTCFEv5KAQHHFhILjU.png'
    },
    {
        name: 'Butterfly',
        mezon_emoji_id: '7364687323743528711',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_butterfly-yzsUsYyjzLe9X4HLDtPx5TXA81PqLV.png'
    },
    {
        name: 'Dolphin',
        mezon_emoji_id: '7364687366039926281',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_dolphin-N8gLgyNLccjFXVR79tCCphq5BtyvWJ.png'
    },
    {
        name: 'Scorpion',
        mezon_emoji_id: '7364687596644916336',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_scorpion-cmIXzXx9Ky5mVeARNw1poFwgYCehfZ.png'
    },
    {
        name: 'Eagle',
        mezon_emoji_id: '7364688014495286891',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bassassin%5D_eagle%20%281%29-viKiQn0QRplkskmqKLK8oSP0xZnrlo.png'
    },
    {
        name: 'Dino',
        mezon_emoji_id: '7364691858330166336',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_dino-2GECc6dKom1UFPY0lLUAXI4MJJScct.png'
    },
    {
        name: 'Lion',
        mezon_emoji_id: '7364691886664733553',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 2,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bwarrior%5D_lion-pw0zjegKyywLQnOS5XXl4embOtjP1n.png'
    },
    //Rare
    {
        name: 'Dread Porcupine',
        mezon_emoji_id: '7366467188352194458',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Brare%5D_Dread%20Porcupine-h703mWSPMkJPEtKdRA4KV5RdQAR7cl.png'
    },
    {
        name: 'Owl',
        mezon_emoji_id: '7366467290973474859',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bsupport%5D_owl-bXG8pOGXdARWtlN9cYRoaK9WrjGKlE.png'
    },
    {
        name: 'Bee',
        mezon_emoji_id: '7366467319866577408',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/bee-ffJ7DZfpzQ9iDBltbaNLnRQaUmkwIG.png'
    },
    {
        name: 'Penguin',
        mezon_emoji_id: '7366467369762305576',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/penguin-xbi5FbQyB5WSQQ8F2l563gzf58PllT.png'
    },
    {
        name: 'Seahorse',
        mezon_emoji_id: '7366467424187239598',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 3,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/seahorse-SVFiEhIlQhaoZllZxtEEq5ntU4L4GO.png'
    },

    // Mythical Creatures (Epic)
    {
        name: 'Basilisk',
        mezon_emoji_id: '7359855035740708032',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_basilisk%20-imxfTtYjVt9bnhsQWBsLlbJUzXxhXS.png'
    },
    {
        name: 'Cerberus',
        mezon_emoji_id: '7359855111719414313',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_cerberus-rvUab4f1uCikfqe72wu1z5C6Ii6mRm.png'
    },
    {
        name: 'Dragon',
        mezon_emoji_id: '7359855161466150856',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_dragon-6o6INJPBo4J3Ql3RFQyqpam3ZywcbS.png'
    },
    {
        name: 'Griffin',
        mezon_emoji_id: '7359855223036807590',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_griffin-raauOPaKgYz3KZfsHIsIC8o3EYvxpe.png'
    },
    {
        name: 'Hydra',
        mezon_emoji_id: '7359855260169629201',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_hydra-c43hB9Sx17lEnHwL1hWGUpeM9Bw277.png'
    },
    {
        name: 'Phoenix',
        mezon_emoji_id: '7359855392921938838',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_phoenix-wRhG0BoW6UE4tW41xJ6fwuW2Cq0Dxo.png'
    },
    {
        name: 'Unicorn',
        mezon_emoji_id: '7359855432450657385',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Bepic%5D_unicorn-KRwfznsfxxI6Khkyy7eraVygVvibpR.png'
    },
    {
        name: 'Manticore',
        mezon_emoji_id: '7359858743165326878',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 4,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/_epic__manticore-removebg-preview%20%281%29-Sry14b1xK8j0nw2yuszgwQECxjA5DS.png'
    },

    // Chinese Zodiac (Legendary)
    {
        name: 'Lunar Rat',
        mezon_emoji_id: '7359938752431810782',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/ti-DpJBKvTtoTIt3DM7QXxQnKfRvpWD09.png'
    },
    {
        name: 'Lunar Ox',
        mezon_emoji_id: '7359938804694634440',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/suu-m4i98wCrEa5Relik1CY8Mur9tBA73c.png'
    },
    {
        name: 'Lunar Tiger',
        mezon_emoji_id: '7359938837038813309',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/dan-Zq4uMMA6c2Y0rAGWCbA6ffjsdyQobq.png'
    },
    {
        name: 'Lunar Cat',
        mezon_emoji_id: '7359938879013831780',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/mao-5aUd3VwVG5jOy9RF4jaHzQENsCTFb9.png'
    },
    {
        name: 'Lunar Dragon',
        mezon_emoji_id: '7359938940833032841',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/thin-zcu9GCzgNzSXcOUp9FSdMViXqlTGBV.png'
    },
    {
        name: 'Lunar Snake',
        mezon_emoji_id: '7359939001056393190',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/ty-2HcxPVQ4NTol9dgPYdBd1XU3f2h9FU.png'
    },
    {
        name: 'Lunar Horse',
        mezon_emoji_id: '7359939033460169061',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/ngo-t5CpoZCcmuF0P3BBp5u808noob5unW.png'
    },
    {
        name: 'Lunar Goat',
        mezon_emoji_id: '7359939079661840579',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/mui-1AWMzXclOzg15SGccs6Uf5T50VL6Ia.png'
    },
    {
        name: 'Lunar Monkey',
        mezon_emoji_id: '7359939117018127739',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/than-zeldBp2hyKhcRImm65S5PSZHbDzqE8.png'
    },
    {
        name: 'Lunar Rooster',
        mezon_emoji_id: '7359939230398954679',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/dau-FL4brruJexuYKM1cN4le1laQPZNpim.png'
    },
    {
        name: 'Lunar Dog',
        mezon_emoji_id: '7359939274893697177',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/tuat-vyl2rNo2wz1GBmX2bdWF0cMwtqucAV.png'
    },
    {
        name: 'Lunar Pig',
        mezon_emoji_id: '7359939317916230055',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 5,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/hoi-Z4DXCW1YVtut4RraDUYTxhSVHrMliL.png'
    },

    // Zodiac Sign (Mythic)
    {
        name: 'Aries',
        mezon_emoji_id: '7359862840344976491',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/aries-GsKgMfIJmRJHcOYd327AAEH9i3CtHs.png'
    },
    {
        name: 'Taurus',
        mezon_emoji_id: '7359863322598722629',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/taurus-arDqNAk5KZzBwnvN306GPlLetP8QZv.png'
    },
    {
        name: 'Gemini',
        mezon_emoji_id: '7359863048722082271',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/gemini-VeczBh96rTZzBBEMLF1QvxUBOYoriA.png'
    },
    {
        name: 'Cancer',
        mezon_emoji_id: '7359862939396115055',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/cancer-WfHuAIk0T06ApUAR65kVbkO7mE5UVE.png'
    },
    {
        name: 'Leo',
        mezon_emoji_id: '7359863083358580971',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/leo-lCwWgLAme2m2aJkUDoI0MveK9T2QPJ.png'
    },
    {
        name: 'Virgo',
        mezon_emoji_id: '7359863373819759972',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/virgo-1n3qmVSWnRbRA8NOmci9ik2vnlCp9A.png'
    },
    {
        name: 'Libra',
        mezon_emoji_id: '7359863123741186292',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/libra-MJ4qe59FQkQiPZj63zPHGttGA5ZjpI.png'
    },
    {
        name: 'Scorpius',
        mezon_emoji_id: '7359863273097857497',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/scorpio-AxwzW4i5CbPjagnHTPZkMNQUGbMnAO.png'
    },
    {
        name: 'Sagittarius',
        mezon_emoji_id: '7359863229022549423',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/sagittarius-IXZ3ORK3HpaFpA8rWcAFUMLgVzoE1m.png'
    },
    {
        name: 'Capricorn',
        mezon_emoji_id: '7359862990820691942',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/capricorn-yWXcNKV0kfLqFZhtxZkmEocQ0lE98z.png'
    },
    {
        name: 'Aquarius',
        mezon_emoji_id: '7359862895473998969',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/aquarius-MvI2sOdv0hBk99vdtvqtxwedyIW3F0.png'
    },
    {
        name: 'Pisces',
        mezon_emoji_id: '7359863177060978875',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 6,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/pisces-MEmM0hKzI4MG1t5MUucACgsIceQ8DL.png'
    },

    // Four Symbols
    {
        name: 'Azure Dragon',
        mezon_emoji_id: '7359865845194434505',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Blimited%5D_Azure%20Dragon-isZ2o2mqnTyybaZZK9GuD4UeN0Lzn8.png'
    },
    {
        name: 'White Tiger',
        mezon_emoji_id: '7359877318742843139',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/white_tiger-BfDX5sSwq98az5A404rX6aeba2hyCB.png'
    },
    {
        name: 'Vermilion Bird',
        mezon_emoji_id: '7359866087154359745',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Blimited%5D_Vermilion%20Bird-sYTVXTXsSWWI2VKlcKM3xIQJYj0vH1.png'
    },
    {
        name: 'Black Tortoise Snake',
        mezon_emoji_id: '7359866010433602674',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 7,
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/%5Blimited%5D_Black%20Tortoise%20%26%20Snake-QzeeX7vi1DcR1uK0lguOBQHIN8mCcl.png'
    }
];
