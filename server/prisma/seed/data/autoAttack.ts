import { EScalingType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type AutoAttackSeed = {
    pet_id: number;
    name: string;
    description: string;
    damage: number;
    scaling_type: EScalingType;
    attack_position: ETargetPosition;
};

export const seedAutoAttack = async () => {
    for (const autoAttack of autoAttackSeedData) {
        const existing = await prisma.autoAttack.findFirst({
            where: { name: autoAttack.name }
        });

        if (!existing) {
            await prisma.autoAttack.create({
                data: {
                    pet_id: autoAttack.pet_id,
                    name: autoAttack.name,
                    description: autoAttack.description,
                    damage: autoAttack.damage,
                    scaling_type: autoAttack.scaling_type,
                    attack_position: autoAttack.attack_position
                }
            });
        } else {
            await prisma.autoAttack.update({
                where: { id: existing.id },
                data: {
                    pet_id: autoAttack.pet_id,
                    name: autoAttack.name,
                    description: autoAttack.description,
                    damage: autoAttack.damage,
                    scaling_type: autoAttack.scaling_type,
                    attack_position: autoAttack.attack_position
                }
            });
        }
    }
};

export const autoAttackSeedData: AutoAttackSeed[] = [
    //Common
    {
        pet_id: 1,
        name: 'Elephant Basic Attack',
        description: 'Dùng ngà húc mạnh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 2,
        name: 'Rhinoceros Basic Attack',
        description: 'Lao tới húc, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 3,
        name: 'Raccoon Basic Attack',
        description: 'Ném cầu ma pháp, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 4,
        name: 'Frog Basic Attack',
        description: 'Phun nọc độc, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 5,
        name: 'Koala Basic Attack',
        description: 'Ném lá ma lực, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 6,
        name: 'Rabbit Basic Attack',
        description: 'Đá nhanh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 7,
        name: 'Chameleon Basic Attack',
        description: 'Đòn lưỡi độc, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 8,
        name: 'Ferret Basic Attack',
        description: 'Chém nhanh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 9,
        name: 'Boar Basic Attack',
        description: 'Dùng nanh húc mạnh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 10,
        name: 'Headbutt',
        description: 'Húc đầu, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    //Uncommon
    {
        pet_id: 11,
        name: 'Heavy Palm',
        description: 'Đòn chưởng mạnh, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 12,
        name: 'Tusk Smash',
        description: 'Húc bằng mõm, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 13,
        name: 'Flame Burst',
        description: 'Phun lửa, gây 105% AP phép cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 14,
        name: 'Spirit Flame',
        description: 'Gửi linh hỏa, gây 105% AP phép cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 15,
        name: 'Soothing Wind',
        description: 'Vỗ cánh tạo luồng gió, gây 105% AP cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 16,
        name: 'Aqua Heal',
        description: 'Phóng tia nước tấn công 1 mục tiêu, gây 105% AP',
        damage: 105,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 17,
        name: 'Venom Sting',
        description: 'Đâm nọc độc, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 18,
        name: 'Talon Strike',
        description: 'Vồ bằng vuốt, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 19,
        name: 'Tail Smash',
        description: 'Quật đuôi mạnh, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 20,
        name: 'Fierce Bite',
        description: 'Cắn mạnh, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    // Rare
    {
        pet_id: 21,
        name: 'Dread Porcupine',
        description: 'Tấn công một mục tiêu, gây 115% ATK cho 1 mục tiêu',
        damage: 115,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 22,
        name: 'Owl',
        description: 'Dùng cánh phủ ánh sáng trăng, hồi 115% AP máu cho 1 đồng minh',
        damage: 115,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 23,
        name: 'Bee',
        description: 'Đâm nhanh bằng nọc độc, gây 115% ATK cho 1 mục tiêu',
        damage: 115,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 24,
        name: 'Penguin',
        description: 'Ném cục băng nhỏ, gây 115% AP cho 1 mục tiêu',
        damage: 115,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 25,
        name: 'Seahorse',
        description: 'Quất mạnh chiếc đuôi cong, gây 115% ATK cho 1 mục tiêu',
        damage: 115,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    //Epic
    {
        pet_id: 26,
        name: 'Petrify Gaze',
        description: 'Ánh mắt hóa đá, gây 125% AP cho 1 mục tiêu.',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 27,
        name: 'Triple Bite',
        description: 'Dùng 3 đầu cắn, gây 75% ATK cho 3 mục tiêu',
        damage: 75,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 28,
        name: 'Fire Breath',
        description: 'Hơi thở rực lửa, gây 75% AP cho 3 mục tiêu',
        damage: 75,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 29,
        name: 'Sky Slash',
        description: 'Cánh vuốt từ bầu trời, gây 125% ATK cho 1 mục tiêu',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 30,
        name: 'Multi-Head Strike',
        description: 'Những cái đầu đồng loạt tấn công, gây 75% AP cho 3 mục tiêu',
        damage: 75,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 31,
        name: 'Flame Wing',
        description: 'Quạt lửa, gây 75% AP cho 3 mục tiêu',
        damage: 75,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 32,
        name: 'Holy Horn',
        description: 'Sừng thần lóe sáng, gây 125% AP cho 1 mục tiêu.',
        damage: 125,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 33,
        name: 'Tail Pierce',
        description: 'Cú đâm bằng đuôi tẩm nọc, gây 125% ATK cho 1 mục tiêu',
        damage: 125,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    //Legendary
    {
        pet_id: 34,
        name: 'Rat Basic Attack',
        description:
            'Đánh 1 mục tiêu thấp máu nhất bằng 135% AD. Có 30% cơ hội áp dụng hiệu ứng giảm 10% DEF lên đối phương trong 2 lượt.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 35,
        name: 'Ox Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD, hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 36,
        name: 'Tiger Basic Attack',
        description:
            'Đánh 1 mục tiêu gần nhất bằng 135% AD, sau đó gây thêm 30% sát thương lan lên 1 kẻ địch gần nhất.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 37,
        name: 'Cat Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP và hồi cho đồng minh có % HP thấp nhất một lượng bằng 20% sát thương gây ra.',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 38,
        name: 'Dragon Basic Attack',
        description:
            'Đánh 3 mục tiêu gần nhất bằng 100% AP, 25% cơ hội thiêu đốt 2 mục tiêu trong 1 lượt (gây sát thương bằng 15% tổng sát thương của đòn đánh).',
        damage: 100,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 39,
        name: 'Snake Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP và có 25% cơ hội gây câm lặng lên đối phương trong 1 lượt.',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 40,
        name: 'Horse Basic Attack',
        description: 'Đánh ngẫu nhiên 3 mục tiêu bằng 100% AD và tăng 10% DEF cho bản thân trong 1 lượt.',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 41,
        name: 'Goat Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP, hồi cho đồng minh ngẫu nhiên 5% HP tối đa.',
        damage: 135,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 42,
        name: 'Monkey Basic Attack',
        description: 'Đánh 3 mục tiêu trước mặt bằng 100% AD, mỗi đòn đánh có 30% cơ hội giảm 10% DEF trong 1 lượt.',
        damage: 100,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 43,
        name: 'Rooster Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và tăng 10% DEF cho bản thân trong 1 lượt.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 44,
        name: 'Dog Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 45,
        name: 'Pig Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Random
    },

    //Mythic
    {
        pet_id: 46,
        name: 'Horn Charge',
        description: 'Húc mạnh bằng cặp sừng rực lửa, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 47,
        name: 'Earth Smash',
        description: 'Dậm chân rung chuyển mặt đất, gây 90% ATK cho 3 mục tiêu',
        damage: 90,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 48,
        name: 'Twin Strike',
        description: 'Song đao tấn công, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 49,
        name: 'Healing Wave',
        description: 'Sóng nước dịu lành vỗ về, hồi 145% AP máu cho 1 đồng minh',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 50,
        name: 'Lion Claw',
        description: 'Vung vuốt sắc bén, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 51,
        name: 'Purity Touch',
        description: 'Bàn tay tinh khôi tỏa sáng, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 52,
        name: 'Scale Slash',
        description: 'Nhát chém chuẩn xác, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 53,
        name: 'Venom Tail',
        description: 'Vung đuôi mang nọc độc chí tử, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 54,
        name: 'Arrow Shot',
        description: 'Phóng mũi tên chớp nhoáng, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 55,
        name: 'Mountain Strike',
        description: 'Đập như núi lở, gây 90% ATK cho 3 mục tiêu',
        damage: 90,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 56,
        name: 'Water Flow',
        description: 'Sóng chảy lan tỏa, gây 90% ATK cho 3 mục tiêu',
        damage: 90,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 57,
        name: 'Aqua Touch',
        description: 'Dòng nước dịu dàng chữa lành, hồi 145% AP máu cho 1 đồng minh',
        damage: 145,
        scaling_type: EScalingType.Magical,
        attack_position: ETargetPosition.Random
    },
    //Limited
    {
        pet_id: 58,
        name: 'Dragon Strike',
        description: 'Cánh vuốt từ bầu trời, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 59,
        name: 'Lion claw',
        description: 'Vung vuốt sắc bén, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 60,
        name: 'Venom Tail',
        description: 'Cánh vuốt từ bầu trời, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 61,
        name: 'Immortal Gaze',
        description: 'Cánh vuốt từ bầu trời, gây 145% ATK cho 1 mục tiêu',
        damage: 145,
        scaling_type: EScalingType.Physical,
        attack_position: ETargetPosition.Nearest
    }
];
