import { EScalingType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ActiveSkillSeed = {
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
                    scaling_type: activeSkill.scaling_type,
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
                    scaling_type: activeSkill.scaling_type,
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
        pet_id: 1,
        name: 'Iron Fortress',
        description: 'Biến thân thành pháo đài thép, tăng 30% DEF cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 2,
        name: 'Unyielding Guard',
        description: 'Tập trung sức mạnh, giảm 25% sát thương nhận vào cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 3,
        name: 'Mystic Mirage',
        description: 'Tự bao bọc bằng ảo ảnh, tăng 40% sát thương phép của bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 4,
        name: 'Swamp Curse',
        description: 'Hấp thụ sức mạnh đầm lầy, tăng 30% AP và có 20% cơ hội gây độc khi tấn công trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 5,
        name: 'Dreamy Embrace',
        description: 'Thiền định trong mộng, hồi 20% HP cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 6,
        name: 'Moonlight Grace',
        description: 'Ban phước ánh trăng, tăng 20% ATK và 15% tốc độ cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 7,
        name: 'Phantom Hunt',
        description: 'Tàng hình, tăng 40% ATK cho bản thân trong 1 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 8,
        name: 'Shadow Ambush',
        description: 'Rình rập trong bóng tối, tăng 50% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 9,
        name: 'Savage Roar',
        description: 'Cường hóa sức mạnh hoang dã, tăng 40% ATK cho bản thân trong 3 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 10,
        name: 'Battle Spirit',
        description: 'Khí thế chiến đấu, tăng 20% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 200,
        attack_position: ETargetPosition.Nearest
    },

    //Uncommon
    {
        pet_id: 11,
        name: 'Iron Fortress',
        description: 'Biến thân thành pháo đài thép, tăng 30% DEF cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 12,
        name: 'Unyielding Guard',
        description: 'Tập trung sức mạnh, giảm 25% sát thương nhận vào cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 13,
        name: 'Mystic Mirage',
        description: 'Bao phủ ảo ảnh, tăng 40% sát thương phép cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 14,
        name: 'Swamp Curse',
        description: 'Hấp thụ sức mạnh đầm lầy, tăng 30% AP cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 15,
        name: 'Dreamy Embrace',
        description: 'Thiền định trong mộng, hồi 20% HP cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 16,
        name: 'Moonlight Grace',
        description: 'Ban phước ánh trăng, tăng 20% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 17,
        name: 'Phantom Hunt',
        description: 'Tàng hình, tăng 40% ATK cho bản thân trong 1 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 18,
        name: 'Shadow Ambush',
        description: 'Rình rập trong bóng tối, tăng 50% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 205,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 19,
        name: 'Savage Roar',
        description: 'Cường hóa sức mạnh hoang dã, tăng 40% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 20,
        name: 'Battle Spirit',
        description: 'Khí thế chiến đấu, tăng 20% ATK cho bản thân trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 100,
        attack_position: ETargetPosition.Nearest
    },

    //Rare
    {
        pet_id: 21,
        name: 'Iron Quill Shield',
        description: 'Xù toàn bộ lông nhọn và co người lại, tăng 30% DEF cho bản thân trong 3 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 0,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 22,
        name: 'Frozen Wave',
        description: 'Xù toàn bộ lông nhọn và co người lại, tăng 30% DEF cho bản thân trong 3 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 0,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 23,
        name: 'Night Wisdom',
        description: 'Xù toàn bộ lông nhọn và co người lại, tăng 30% DEF cho bản thân trong 3 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 0,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 24,
        name: 'Hive Fury',
        description: 'Xù toàn bộ lông nhọn và co người lại, tăng 30% DEF cho bản thân trong 3 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 0,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 25,
        name: 'Tidal Blessing',
        description: 'Gọi sức mạnh biển cả, hồi 225% AP máu cho 1 đồng minh',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 225,
        attack_position: ETargetPosition.LowestHP
    },

    //Epic
    {
        pet_id: 26,
        name: 'Venomous Curse',
        description:
            'Hơi thở độc hại bao phủ chiến trường, gây 175% AP cho 3 mục tiêu, kèm 20% cơ hội Poison trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 175,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 27,
        name: 'Hellfire Fang',
        description:
            'Cú cắn bùng cháy địa ngục, gây 175% ATK cho 3 mục tiêu, đồng thời thiêu đốt mỗi mục tiêu mất thêm 10% HP trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 175,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 28,
        name: 'Dragon’s Wrath',
        description: 'Phun lửa dữ dội, gây 175% AP cho 3 mục tiêu, đồng thời giảm 10% ATK của mục tiêu trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 175,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 29,
        name: 'Storm Dive',
        description:
            'Lao xuống như cơn bão, gây 175% ATK cho 3 mục tiêu, đồng thời tăng 15% ATK cho bản thân trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 175,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 30,
        name: 'Toxic Torrent',
        description:
            'Cơn lũ độc phun trào, gây 175% AP cho 3 mục tiêu, đồng thời hồi 10% HP cho Hydra mỗi mục tiêu trúng',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 175,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 31,
        name: 'Deadly Barrage',
        description:
            'Vung đuôi liên hoàn, gây 175% ATK cho 3 mục tiêu, đồng thời giảm 15% DEF của mục tiêu trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 175,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 32,
        name: 'Rebirth Flame',
        description: 'Lửa tái sinh thiêu đốt, gây 175% AP cho 3 mục tiêu, đồng thời hồi 20% HP cho bản thân',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 175,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 33,
        name: 'Miracle Light',
        description: 'Hào quang thần diệu tấn công 175% AP cho 3 mục tiêu, đồng thời hồi 25% HP cho bản thân',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 175,
        attack_position: ETargetPosition.All
    },

    //Legendary
    {
        pet_id: 9,
        name: 'Fatal Strike',
        description:
            'Tí tung đòn chí mạng, gây sát thương bằng 235% AD lên mục tiêu yếu nhất. Nếu hạ gục được kẻ địch, Tí bùng nổ sức mạnh, tăng 30% ATK trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 235,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 10,
        name: 'Iron Retribution',
        description:
            'Sửu hóa thành pháo đài sống, tăng 20% ATK cho toàn bộ đồng minh và phản lại 20% sát thương nhận vào cho kẻ tấn công trong 2 lượt. ',
        mana_cost: 100,
        scaling_type: EScalingType.Physical
    },
    {
        pet_id: 11,
        name: 'Wild Carnage',
        description:
            'Dần gầm lên giận dữ, gây sát thương bằng 185% AD lên toàn bộ kẻ địch. Tiếp đó Dần tăng 20% hút máu trong 2 lượt để tiếp tục cuộc tàn sát.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 185,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 12,
        name: 'Moonlit Grace',
        description:
            'Mão triệu hồi ánh trăng dịu dàng, hồi HP cho toàn bộ đồng minh bằng 185% AP của mình. Ánh sáng trăng còn ban phước, tăng 20% DEF cho cả đội trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical
    },
    {
        pet_id: 13,
        name: 'Divine Wrath',
        description:
            'Thìn phát ra tiếng gầm sấm sét, gây sát thương bằng 185% AP lên toàn bộ kẻ địch. Sức mạnh của rồng làm suy yếu ý chí chiến đấu, giảm 20% ATK của kẻ địch trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 185,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 14,
        name: 'Venomous Whisper',
        description:
            'Tỵ thì thầm lời nguyền độc địa, gây sát thương bằng 200% AP lên 2 kẻ địch có HP cao nhất. Lời nguyền khóa chặt giọng nói của chúng, áp dụng hiệu ứng câm lặng trong 1 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 200,
        attack_position: ETargetPosition.HighestHP
    },
    {
        pet_id: 15,
        name: 'Savage Trample',
        description:
            'Ngọ giẫm đạp dã man, gây sát thương bằng 235% AD lên một mục tiêu ngẫu nhiên. Vết thương từ cú giẫm đạp gây đau đớn tột cùng, giảm 40% khả năng hồi máu của mục tiêu trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 235,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 16,
        name: 'Eternal Shepherd',
        description:
            'Mùi ban phát ân điển vĩnh cửu, hồi sinh một đồng minh đã ngã xuống với 30% HP (chỉ có thể sử dụng 1 lần mỗi trận). Nếu không có ai cần hồi sinh, Mùi chữa lành đồng minh yếu nhất bằng 15% HP tối đa của họ.',
        mana_cost: 100,
        scaling_type: EScalingType.Magical
    },
    {
        pet_id: 17,
        name: 'Shadow Frenzy',
        description:
            'Thân hóa thành bóng tối cuồng loạn, tung 3 đòn đánh chí mạng vào mục tiêu yếu nhất, mỗi đòn gây 80% AD. Mỗi cú đánh có 70% cơ hội xé toạc phòng thủ, giảm 15% DEF trong 2 lượt, cộng dồn tối đa đến 45%.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 240,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 18,
        name: "Dawn's Rally",
        description:
            'Dậu gáy vang hiệu lệnh bình minh, gây sát thương bằng 185% AD lên toàn bộ kẻ địch. Tiếng gáy truyền sức mạnh, tăng 25% ATK và 25% DEF cho toàn bộ đồng minh (trừ Dậu) trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 185,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 19,
        name: 'Ironbark Howl',
        description:
            'Tuất phát ra tiếng hú vang dội như vỏ sắt, tăng 30% DEF cho bản thân trong 2 lượt. Tiếng hú gây kinh hoàng, giảm 20% ATK của toàn bộ kẻ địch trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical
    },
    {
        pet_id: 20,
        name: 'Stalwart Bulwark',
        description:
            'Hợi hóa thành tấm chắn kiên cường, tăng 20% DEF cho toàn bộ đồng minh và đồng thời Hợi còn hồi phục 10% HP tối đa cho bản thân mỗi lượt trong 2 lượt.',
        mana_cost: 100,
        scaling_type: EScalingType.Physical
    },

    //Mythic
    {
        pet_id: 34,
        name: 'Burning Rush',
        description: 'Lao tới trong ngọn lửa, gây 245% ATK cho 1 mục tiêu và làm choáng 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 245,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 35,
        name: 'Iron Hide',
        description:
            'Tăng 40% DEF cho toàn đội trong 2 lượt, đồng thời gây 190% ATK sát thương và trừ thêm 10% HP cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 36,
        name: 'Mirror Illusion',
        description: 'Triệu hồi bản sao, gây 190% ATK cho 3 mục tiêu và giảm 15% HP của chúng trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 37,
        name: 'Shell Sanctuary',
        description: 'Hồi 190% AP máu cho 3 đồng minh ngẫu nhiên và tăng 15% DEF trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 38,
        name: 'Roar of Kings',
        description: 'Gầm vang, gây 190% ATK cho 3 mục tiêu, đồng thời tăng 20% ATK toàn đội trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 39,
        name: 'Sacred Light',
        description: 'Ánh sáng tinh khiết, hồi 190% AP máu cho 3 đồng minh ngẫu nhiên và xóa 1 debuff',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 40,
        name: 'Judgment',
        description: 'Phán quyết công lý, gây 190% ATK cho 3 mục tiêu và giảm 20% ATK của chúng trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 41,
        name: 'Death Sting',
        description:
            'Cú chích chết người, gây 245% ATK cho 1 mục tiêu và khiến mục tiêu mất thêm 5% HP mỗi lượt trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 245,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 42,
        name: 'Meteor Arrow',
        description: 'Mưa tên sao băng, gây 190% ATK cho 3 mục tiêu và giảm 10% HP của chúng trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 43,
        name: 'Stone Guardian',
        description:
            'Triệu hồi sức mạnh núi đá, gây 190% ATK sát thương lên 3 mục tiêu, đồng thời tăng 30% DEF cho toàn đội trong 3 lượt và tạo 1 lá chắn = 15% HP tối đa',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 44,
        name: 'Wave of Life',
        description:
            'Dội dòng chảy sự sống, hồi 190% AP máu cho 3 đồng minh ngẫu nhiên và tăng 10% HP cho toàn đội trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 45,
        name: 'Ocean’s Embrace',
        description: 'Sóng cả bao phủ, hồi 190% AP máu cho 3 đồng minh',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 46,
        name: 'Horn Charge',
        description:
            'Dội dòng chảy sự sống, hồi 190% AP máu cho 3 đồng minh ngẫu nhiên và tăng 10% HP cho toàn đội trong 2 lượt',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 47,
        name: 'Earth Smash',
        description: 'Sóng cả bao phủ, hồi 190% AP máu cho 3 đồng minh',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 190,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 48,
        name: 'Twin Strike',
        description: 'Song đao tấn công, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 49,
        name: 'Healing Wave',
        description: 'Sóng nước dịu lành vỗ về, hồi 145% AP máu cho 1 đồng minh',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 50,
        name: 'Lion Claw',
        description: 'Vung vuốt sắc bén, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 51,
        name: 'Purity Touch',
        description: 'Bàn tay tinh khôi tỏa sáng, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 145,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 52,
        name: 'Scale Slash',
        description: 'Nhát chém chuẩn xác, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 53,
        name: 'Venom Tail',
        description: 'Vung đuôi mang nọc độc chí tử, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 54,
        name: 'Arrow Shot',
        description: 'Phóng mũi tên chớp nhoáng, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 55,
        name: 'Mountain Strike',
        description: 'Đập như núi lở, gây 90% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 90,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 56,
        name: 'Water Flow',
        description: 'Sóng chảy lan tỏa, gây 90% ATK cho 3 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 90,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 57,
        name: 'Aqua Touch',
        description: 'Dòng nước dịu dàng chữa lành, hồi 145% AP máu cho 1 đồng minh',
        mana_cost: 100,
        scaling_type: EScalingType.Magical,
        damage: 145,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 58,
        name: 'Dragon Strike',
        description: 'Cánh vuốt từ bầu trời, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 59,
        name: 'Lion claw',
        description: 'Vung vuốt sắc bén, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 60,
        name: 'Venom Tail',
        description: 'Vung đuôi mang nọc độc chí tử, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 61,
        name: 'Immortal Gaze',
        description: 'Cánh vuốt từ bầu trời, gây 145% ATK cho 1 mục tiêu',
        mana_cost: 100,
        scaling_type: EScalingType.Physical,
        damage: 145,
        attack_position: ETargetPosition.Nearest
    }
];
