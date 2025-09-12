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
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827935/Ainz%20Mezon%20Bot/Pets/gkmbbizwcczvxdimhgz7.png',
        description: 'Coming soon',
        statistic_id: 8,
        rarity_id: 1
    },
    {
        name: 'Rhinoceros',
        mezon_emoji_id: '7364683316891742229',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827935/Ainz%20Mezon%20Bot/Pets/cpjb4fksqmvqbkhnznku.png',
        description: 'Coming soon',
        statistic_id: 7,
        rarity_id: 1
    },
    {
        name: 'Raccoon',
        mezon_emoji_id: '7364683587207230928',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827926/Ainz%20Mezon%20Bot/Pets/oxinith0o58u5kd9ruow.png',
        description: 'Coming soon',
        statistic_id: 5,
        rarity_id: 1
    },
    {
        name: 'Frog',
        mezon_emoji_id: '7364683675713254522',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827926/Ainz%20Mezon%20Bot/Pets/wnp03lpuklwwwzwuffvi.png',
        description: 'Coming soon',
        statistic_id: 10,
        rarity_id: 1
    },
    {
        name: 'Koala',
        mezon_emoji_id: '7364683826746947317',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827931/Ainz%20Mezon%20Bot/Pets/g99bfplykb9lsadkijsv.png',
        description: 'Coming soon',
        statistic_id: 6,
        rarity_id: 1
    },
    {
        name: 'Rabbit',
        mezon_emoji_id: '7364683964909625004',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827931/Ainz%20Mezon%20Bot/Pets/slibtdzufud1al9qgmwh.png',
        description: 'Coming soon',
        statistic_id: 2,
        rarity_id: 1
    },
    {
        name: 'Chameleon',
        mezon_emoji_id: '7364684113642914837',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827921/Ainz%20Mezon%20Bot/Pets/bbiioutt4lo5gto4injs.png',
        description: 'Coming soon',
        statistic_id: 10,
        rarity_id: 1
    },
    {
        name: 'Ferret',
        mezon_emoji_id: '7364684218516359305',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827921/Ainz%20Mezon%20Bot/Pets/fqvboj4kqt24ir42kgie.png',
        description: 'Coming soon',
        statistic_id: 1,
        rarity_id: 1
    },
    {
        name: 'Boar',
        mezon_emoji_id: '7364684386591267766',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827941/Ainz%20Mezon%20Bot/Pets/mncxhrct4dlsjxgbh9qo.png',
        description: 'Coming soon',
        statistic_id: 3,
        rarity_id: 1
    },
    {
        name: 'Ram Sheep',
        mezon_emoji_id: '7364684441621524749',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827941/Ainz%20Mezon%20Bot/Pets/zlna2xraavsmv6ox3hw0.png',
        description: 'Coming soon',
        statistic_id: 4,
        rarity_id: 1
    },

    //Uncommon
    {
        name: 'Panda',
        mezon_emoji_id: '7364686710908002637',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827906/Ainz%20Mezon%20Bot/Pets/pgb49furblgshmcswcap.png',
        description: 'Coming soon',
        statistic_id: 18,
        rarity_id: 2
    },
    {
        name: 'Pig',
        mezon_emoji_id: '7364686809690789368',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827906/Ainz%20Mezon%20Bot/Pets/qcedyvuw8i9ko2a70pml.png',
        description: 'Coming soon',
        statistic_id: 17,
        rarity_id: 2
    },
    {
        name: 'Salamander',
        mezon_emoji_id: '7364686968840447654',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827896/Ainz%20Mezon%20Bot/Pets/jxf7gobshyldkcsn1rhc.png',
        description: 'Coming soon',
        statistic_id: 16,
        rarity_id: 2
    },
    {
        name: 'Fox',
        mezon_emoji_id: '7364686917436380728',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827896/Ainz%20Mezon%20Bot/Pets/newq5gsfxrfrqy2u45ha.png',
        description: 'Coming soon',
        statistic_id: 20,
        rarity_id: 2
    },
    {
        name: 'Butterfly',
        mezon_emoji_id: '7364687323743528711',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827901/Ainz%20Mezon%20Bot/Pets/bxxkro3upoggqy2ktkn0.png',
        description: 'Coming soon',
        statistic_id: 20,
        rarity_id: 2
    },
    {
        name: 'Dolphin',
        mezon_emoji_id: '7364687366039926281',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827901/Ainz%20Mezon%20Bot/Pets/khbd8aojsjt8wwd0v5no.png',
        description: 'Coming soon',
        statistic_id: 16,
        rarity_id: 2
    },
    {
        name: 'Scorpion',
        mezon_emoji_id: '7364687596644916336',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827890/Ainz%20Mezon%20Bot/Pets/gprbwapoyvqldwd1ypdg.png',
        description: 'Coming soon',
        statistic_id: 12,
        rarity_id: 2
    },
    {
        name: 'Eagle',
        mezon_emoji_id: '7364688014495286891',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827890/Ainz%20Mezon%20Bot/Pets/bc6glhlojmlmnujpiujh.png',
        description: 'Coming soon',
        statistic_id: 11,
        rarity_id: 2
    },
    {
        name: 'Dino',
        mezon_emoji_id: '7364691858330166336',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827912/Ainz%20Mezon%20Bot/Pets/altxfmfguunfu88avdas.png',
        description: 'Coming soon',
        statistic_id: 14,
        rarity_id: 2
    },
    {
        name: 'Lion',
        mezon_emoji_id: '7364691886664733553',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827912/Ainz%20Mezon%20Bot/Pets/asr9upifnatb8sx2svi9.png',
        description: 'Coming soon',
        statistic_id: 13,
        rarity_id: 2
    },
    //Rare
    {
        name: 'Dread Porcupine',
        mezon_emoji_id: '7366467188352194458',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827970/Ainz%20Mezon%20Bot/Pets/u595qyhc4niy900qpkbw.png',
        description: 'Coming soon',
        statistic_id: 27,
        rarity_id: 3
    },
    {
        name: 'Owl',
        mezon_emoji_id: '7366467290973474859',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827970/Ainz%20Mezon%20Bot/Pets/lwctbjwtjgfj477zht7m.png',
        description: 'Coming soon',
        statistic_id: 21,
        rarity_id: 3
    },
    {
        name: 'Bee',
        mezon_emoji_id: '7366467319866577408',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827970/Ainz%20Mezon%20Bot/Pets/g3a4rceruskotsik7dwd.png',
        description: 'Coming soon',
        statistic_id: 30,
        rarity_id: 3
    },
    {
        name: 'Penguin',
        mezon_emoji_id: '7366467369762305576',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827970/Ainz%20Mezon%20Bot/Pets/xzeg3siwjnpageeav1xm.png',
        description: 'Coming soon',
        statistic_id: 26,
        rarity_id: 3
    },
    {
        name: 'Seahorse',
        mezon_emoji_id: '7366467424187239598',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827970/Ainz%20Mezon%20Bot/Pets/p1unqplolkdsercglrff.png',
        description: 'Coming soon',
        statistic_id: 23,
        rarity_id: 3
    },

    // Mythical Creatures (Epic)
    {
        name: 'Basilisk',
        mezon_emoji_id: '7359855035740708032',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/grfcy7kso7d17idx1ybh.png',
        description: 'Coming soon',
        statistic_id: 36,
        rarity_id: 4
    },
    {
        name: 'Cerberus',
        mezon_emoji_id: '7359855111719414313',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/bxhborgwskrb7dfacddp.png',
        description: 'Coming soon',
        statistic_id: 33,
        rarity_id: 4
    },
    {
        name: 'Dragon',
        mezon_emoji_id: '7359855161466150856',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/tflm50pmwnt4087bt1lj.png',
        description: 'Coming soon',
        statistic_id: 40,
        rarity_id: 4
    },
    {
        name: 'Griffin',
        mezon_emoji_id: '7359855223036807590',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/m4ozd33rol95nlyr7wls.png',
        description: 'Coming soon',
        statistic_id: 31,
        rarity_id: 4
    },
    {
        name: 'Hydra',
        mezon_emoji_id: '7359855260169629201',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/ff9agkms2gloj9osp2nd.png',
        description: 'Coming soon',
        statistic_id: 34,
        rarity_id: 4
    },
    {
        name: 'Phoenix',
        mezon_emoji_id: '7359855392921938838',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/a6kntmkaxfbtcw83wocp.png',
        description: 'Coming soon',
        statistic_id: 40,
        rarity_id: 4
    },
    {
        name: 'Unicorn',
        mezon_emoji_id: '7359855432450657385',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/iuhrpkvfzeorlpbyy9fs.png',
        description: 'Coming soon',
        statistic_id: 40,
        rarity_id: 4
    },
    {
        name: 'Manticore',
        mezon_emoji_id: '7359858743165326878',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827870/Ainz%20Mezon%20Bot/Pets/kr0atlzgskorwduag9f4.png',
        description: 'Coming soon',
        statistic_id: 38,
        rarity_id: 4
    },

    // Chinese Zodiac (Legendary)
    {
        name: 'Lunar Rat',
        mezon_emoji_id: '7359938752431810782',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/vw8w3ew8fb5icbd0r1zf.png',
        description: 'Coming soon',
        statistic_id: 41,
        rarity_id: 5
    },
    {
        name: 'Lunar Ox',
        mezon_emoji_id: '7359938804694634440',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/sundtdt4xs1ly765rfir.png',
        description: 'Coming soon',
        statistic_id: 47,
        rarity_id: 5
    },
    {
        name: 'Lunar Tiger',
        mezon_emoji_id: '7359938837038813309',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827816/Ainz%20Mezon%20Bot/Pets/z5d7afzcdeow4odzg6yx.png',
        description: 'Coming soon',
        statistic_id: 43,
        rarity_id: 5
    },
    {
        name: 'Lunar Cat',
        mezon_emoji_id: '7359938879013831780',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/v5gkfxpnusuamab2fw4i.png',
        description: 'Coming soon',
        statistic_id: 42,
        rarity_id: 5
    },
    {
        name: 'Lunar Dragon',
        mezon_emoji_id: '7359938940833032841',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/egkso9p0sfkrn0bx0nig.png',
        description: 'Coming soon',
        statistic_id: 50,
        rarity_id: 5
    },
    {
        name: 'Lunar Snake',
        mezon_emoji_id: '7359939001056393190',
        avatar: 'https://bvntk1sxxrwdoxcc.public.blob.vercel-storage.com/ty-2HcxPVQ4NTol9dgPYdBd1XU3f2h9FU.png',
        description: 'Coming soon',
        statistic_id: 42,
        rarity_id: 5
    },
    {
        name: 'Lunar Horse',
        mezon_emoji_id: '7359939033460169061',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827816/Ainz%20Mezon%20Bot/Pets/uw3hegw6jrnfr1t3afuq.png',
        description: 'Coming soon',
        statistic_id: 43,
        rarity_id: 5
    },
    {
        name: 'Lunar Goat',
        mezon_emoji_id: '7359939079661840579',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/zy6kqqvnqnxzfjhn4kgx.png',
        description: 'Coming soon',
        statistic_id: 45,
        rarity_id: 5
    },
    {
        name: 'Lunar Monkey',
        mezon_emoji_id: '7359939117018127739',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/kbv2zxrjzhugxgh80ay1.png',
        description: 'Coming soon',
        statistic_id: 44,
        rarity_id: 5
    },
    {
        name: 'Lunar Rooster',
        mezon_emoji_id: '7359939230398954679',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/p3odifezq0xgw57tra8q.png',
        description: 'Coming soon',
        statistic_id: 46,
        rarity_id: 5
    },
    {
        name: 'Lunar Dog',
        mezon_emoji_id: '7359939274893697177',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/nwos3eomfeqppq9thyek.png',
        description: 'Coming soon',
        statistic_id: 43,
        rarity_id: 5
    },
    {
        name: 'Lunar Pig',
        mezon_emoji_id: '7359939317916230055',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827817/Ainz%20Mezon%20Bot/Pets/ctyhe7n8nsnm7zjcibdf.png',
        description: 'Coming soon',
        statistic_id: 48,
        rarity_id: 5
    },

    // Zodiac Sign (Mythic)
    {
        name: 'Aries',
        mezon_emoji_id: '7359862840344976491',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/yuxhfkt3v9ieclgrhcsv.png',
        description: 'Coming soon',
        statistic_id: 54,
        rarity_id: 6
    },
    {
        name: 'Taurus',
        mezon_emoji_id: '7359863322598722629',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/xpuapsnxn0vp65g26ltt.png',
        description: 'Coming soon',
        statistic_id: 57,
        rarity_id: 6
    },
    {
        name: 'Gemini',
        mezon_emoji_id: '7359863048722082271',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/hm0pbtylod40f2nuf4on.png',
        description: 'Coming soon',
        statistic_id: 60,
        rarity_id: 6
    },
    {
        name: 'Cancer',
        mezon_emoji_id: '7359862939396115055',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/vdzg7ho2esjmhhl7dgiy.png',
        description: 'Coming soon',
        statistic_id: 58,
        rarity_id: 6
    },
    {
        name: 'Leo',
        mezon_emoji_id: '7359863083358580971',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/iwpmvsql9oilhfaqxcwk.png',
        description: 'Coming soon',
        statistic_id: 53,
        rarity_id: 6
    },
    {
        name: 'Virgo',
        mezon_emoji_id: '7359863373819759972',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/gwuxp0l4i3qx1kxbiton.png',
        description: 'Coming soon',
        statistic_id: 56,
        rarity_id: 6
    },
    {
        name: 'Libra',
        mezon_emoji_id: '7359863123741186292',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/kwhpz6kv6dggq4p1fxah.png',
        description: 'Coming soon',
        statistic_id: 56,
        rarity_id: 6
    },
    {
        name: 'Scorpius',
        mezon_emoji_id: '7359863273097857497',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/gbj6kst2qx50lsntvpof.png',
        description: 'Coming soon',
        statistic_id: 53,
        rarity_id: 6
    },
    {
        name: 'Sagittarius',
        mezon_emoji_id: '7359863229022549423',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/hgrfbas05mkupxpgd2yi.png',
        description: 'Coming soon',
        statistic_id: 51,
        rarity_id: 6
    },
    {
        name: 'Capricorn',
        mezon_emoji_id: '7359862990820691942',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/rf6xoybfhouqkx5xuqdz.png',
        description: 'Coming soon',
        statistic_id: 52,
        rarity_id: 6
    },
    {
        name: 'Aquarius',
        mezon_emoji_id: '7359862895473998969',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/gvieua5wj8ll8bwgeue4.png',
        description: 'Coming soon',
        statistic_id: 56,
        rarity_id: 6
    },
    {
        name: 'Pisces',
        mezon_emoji_id: '7359863177060978875',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756828341/Ainz%20Mezon%20Bot/Pets/xclh17ggaqddmwriaxfj.png',
        description: 'Coming soon',
        statistic_id: 60,
        rarity_id: 6
    },

    // Four Symbols
    {
        name: 'Azure Dragon',
        mezon_emoji_id: '7359865845194434505',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827957/Ainz%20Mezon%20Bot/Pets/vqmz8d85uzsvjvp5u1ra.png',
        description: 'Coming soon',
        statistic_id: 71,
        rarity_id: 7
    },
    {
        name: 'White Tiger',
        mezon_emoji_id: '7359877318742843139',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827957/Ainz%20Mezon%20Bot/Pets/rb712h7jnaoup7le8t1p.png',
        description: 'Coming soon',
        statistic_id: 72,
        rarity_id: 7
    },
    {
        name: 'Vermilion Bird',
        mezon_emoji_id: '7359866087154359745',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827957/Ainz%20Mezon%20Bot/Pets/bf0jakfyu1dh4dqle3c8.png',
        description: 'Coming soon',
        statistic_id: 73,
        rarity_id: 7
    },
    {
        name: 'Black Tortoise Snake',
        mezon_emoji_id: '7359866010433602674',
        avatar: 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1756827957/Ainz%20Mezon%20Bot/Pets/vs8dlg6rasrptbh1koaz.png',
        description: 'Coming soon',
        statistic_id: 74,
        rarity_id: 7
    }
];
