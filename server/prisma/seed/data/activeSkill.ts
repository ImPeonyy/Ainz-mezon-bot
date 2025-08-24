import { EAttackType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ActiveSkillSeed = {
    pet_id: number;
    name: string;
    description: string;
    mana_cost: number;
    attack_type: EAttackType;
    damage?: number;
    attack_position?: ETargetPosition;
};

export const seedActiveSkill = async () => {
    for (const activeSkill of activeSkillSeedData) {
        const existing = await prisma.activeSkill.findFirst({
            where: { name: activeSkill.name }
        });

        if (!existing) {
            await prisma.activeSkill.create({
                data: {
                    pet_id: activeSkill.pet_id,
                    name: activeSkill.name,
                    description: activeSkill.description,
                    mana_cost: activeSkill.mana_cost,
                    attack_type: activeSkill.attack_type,
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
                    attack_type: activeSkill.attack_type,
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
        pet_id: 0,
        name: 'Iron Fortress',
        description: 'Biến thân thành pháo đài thép, tăng 30% DEF cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Unyielding Guard',
        description: 'Tập trung sức mạnh, giảm 25% sát thương nhận vào cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Mystic Mirage',
        description: 'Tự bao bọc bằng ảo ảnh, tăng 40% sát thương phép của bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Swamp Curse',
        description: 'Hấp thụ sức mạnh đầm lầy, tăng 30% AP và có 20% cơ hội gây độc khi tấn công trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Dreamy Embrace',
        description: 'Thiền định trong mộng, hồi 20% HP cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Moonlight Grace',
        description: 'Ban phước ánh trăng, tăng 20% ATK và 15% tốc độ cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Phantom Hunt',
        description: 'Tàng hình, tăng 40% ATK cho bản thân trong 1 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Shadow Ambush',
        description: 'Rình rập trong bóng tối, tăng 50% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Savage Roar',
        description: 'Cường hóa sức mạnh hoang dã, tăng 40% ATK cho bản thân trong 3 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Battle Spirit',
        description: 'Khí thế chiến đấu, tăng 20% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Self
    },

    //Uncommon
    {
        pet_id: 0,
        name: 'Iron Fortress',
        description: 'Biến thân thành pháo đài thép, tăng 30% DEF cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Unyielding Guard',
        description: 'Tập trung sức mạnh, giảm 25% sát thương nhận vào cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Mystic Mirage',
        description: 'Bao phủ ảo ảnh, tăng 40% sát thương phép cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Swamp Curse',
        description: 'Hấp thụ sức mạnh đầm lầy, tăng 30% AP cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Dreamy Embrace',
        description: 'Thiền định trong mộng, hồi 20% HP cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Moonlight Grace',
        description: 'Ban phước ánh trăng, tăng 20% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Phantom Hunt',
        description: 'Tàng hình, tăng 40% ATK cho bản thân trong 1 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Shadow Ambush',
        description: 'Rình rập trong bóng tối, tăng 50% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Savage Roar',
        description: 'Cường hóa sức mạnh hoang dã, tăng 40% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 100,
        attack_position: ETargetPosition.Self
    },
    {
        pet_id: 0,
        name: 'Battle Spirit',
        description: 'Khí thế chiến đấu, tăng 20% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 0,
        attack_position: ETargetPosition.Self
    },
    //Epic
    {
        pet_id: 0,
        name: 'Venomous Curse',
        description:
            'Hơi thở độc hại bao phủ chiến trường, gây 175% AP cho 3 mục tiêu, kèm 20% cơ hội Poison trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 175,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Hellfire Fang',
        description: 'Cú cắn bùng cháy địa ngục, gây 175% ATK cho 3 mục tiêu, đồng thời thiêu đốt (Burn) trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 175,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Dragon’s Wrath',
        description: 'Phun lửa dữ dội, gây 175% AP cho 3 mục tiêu.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 175,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Storm Dive',
        description: 'Lao xuống như cơn bão, gây 192% ATK cho 2 mục tiêu.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 192,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Toxic Torrent',
        description: 'Cơn lũ độc phun trào, gây 175% AP cho 3 mục tiêu, có 25% cơ hội Poison trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 175,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Deadly Barrage',
        description: 'Vung đuôi liên hoàn, gây 175% ATK cho 3 mục tiêu.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 175,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Rebirth Flame',
        description: 'Lửa tái sinh thiêu đốt, gây 192% AP cho 2 mục tiêu và hồi 20% HP cho bản thân.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 192,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Miracle Light',
        description: 'Hào quang thần diệu quét qua, gây 192% AP cho 2 mục tiêu và hồi 25% HP cho bản thân.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 192,
        attack_position: ETargetPosition.Random
    },

    //Legendary
    {
        pet_id: 9,
        name: 'Fatal Strike',
        description:
            'Tí tung đòn chí mạng, gây sát thương bằng 235% AD lên mục tiêu yếu nhất. Nếu hạ gục được kẻ địch, Tí bùng nổ sức mạnh, tăng 30% ATK trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 235,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 10,
        name: 'Iron Retribution',
        description:
            'Sửu hóa thành pháo đài sống, tăng 20% ATK cho toàn bộ đồng minh và phản lại 20% sát thương nhận vào cho kẻ tấn công trong 2 lượt. ',
        mana_cost: 100,
        attack_type: EAttackType.Physical
    },
    {
        pet_id: 11,
        name: 'Wild Carnage',
        description:
            'Dần gầm lên giận dữ, gây sát thương bằng 185% AD lên toàn bộ kẻ địch. Tiếp đó Dần tăng 20% hút máu trong 2 lượt để tiếp tục cuộc tàn sát.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 185,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 12,
        name: 'Moonlit Grace',
        description:
            'Mão triệu hồi ánh trăng dịu dàng, hồi HP cho toàn bộ đồng minh bằng 185% AP của mình. Ánh sáng trăng còn ban phước, tăng 20% DEF cho cả đội trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical
    },
    {
        pet_id: 13,
        name: 'Divine Wrath',
        description:
            'Thìn phát ra tiếng gầm sấm sét, gây sát thương bằng 185% AP lên toàn bộ kẻ địch. Sức mạnh của rồng làm suy yếu ý chí chiến đấu, giảm 20% ATK của kẻ địch trong 2 lượt',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 185,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 14,
        name: 'Venomous Whisper',
        description:
            'Tỵ thì thầm lời nguyền độc địa, gây sát thương bằng 200% AP lên 2 kẻ địch có HP cao nhất. Lời nguyền khóa chặt giọng nói của chúng, áp dụng hiệu ứng câm lặng trong 1 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 200,
        attack_position: ETargetPosition.HighestHP
    },
    {
        pet_id: 15,
        name: 'Savage Trample',
        description:
            'Ngọ giẫm đạp dã man, gây sát thương bằng 235% AD lên một mục tiêu ngẫu nhiên. Vết thương từ cú giẫm đạp gây đau đớn tột cùng, giảm 40% khả năng hồi máu của mục tiêu trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 235,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 16,
        name: 'Eternal Shepherd',
        description:
            'Mùi ban phát ân điển vĩnh cửu, hồi sinh một đồng minh đã ngã xuống với 30% HP (chỉ có thể sử dụng 1 lần mỗi trận). Nếu không có ai cần hồi sinh, Mùi chữa lành đồng minh yếu nhất bằng 15% HP tối đa của họ.',
        mana_cost: 100,
        attack_type: EAttackType.Magical
    },
    {
        pet_id: 17,
        name: 'Shadow Frenzy',
        description:
            'Thân hóa thành bóng tối cuồng loạn, tung 3 đòn đánh chí mạng vào mục tiêu yếu nhất, mỗi đòn gây 80% AD. Mỗi cú đánh có 70% cơ hội xé toạc phòng thủ, giảm 15% DEF trong 2 lượt, cộng dồn tối đa đến 45%.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 240,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 18,
        name: "Dawn's Rally",
        description:
            'Dậu gáy vang hiệu lệnh bình minh, gây sát thương bằng 185% AD lên toàn bộ kẻ địch. Tiếng gáy truyền sức mạnh, tăng 25% ATK và 25% DEF cho toàn bộ đồng minh (trừ Dậu) trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 185,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 19,
        name: 'Ironbark Howl',
        description:
            'Tuất phát ra tiếng hú vang dội như vỏ sắt, tăng 30% DEF cho bản thân trong 2 lượt. Tiếng hú gây kinh hoàng, giảm 20% ATK của toàn bộ kẻ địch trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical
    },
    {
        pet_id: 20,
        name: 'Stalwart Bulwark',
        description:
            'Hợi hóa thành tấm chắn kiên cường, tăng 20% DEF cho toàn bộ đồng minh và đồng thời Hợi còn hồi phục 10% HP tối đa cho bản thân mỗi lượt trong 2 lượt.',
        mana_cost: 100,
        attack_type: EAttackType.Physical
    }
];
