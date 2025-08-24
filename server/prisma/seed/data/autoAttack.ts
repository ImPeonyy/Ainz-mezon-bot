import { EAttackType, ETargetPosition } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type AutoAttackSeed = {
    pet_id: number;
    name: string;
    description: string;
    damage: number;
    attack_type: EAttackType;
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
                    attack_type: autoAttack.attack_type,
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
                    attack_type: autoAttack.attack_type,
                    attack_position: autoAttack.attack_position
                }
            });
        }
    }
};

export const autoAttackSeedData: AutoAttackSeed[] = [
    //Common
    {
        pet_id: 0,
        name: 'Elephant Basic Attack',
        description: 'Dùng ngà húc mạnh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Rhinoceros Basic Attack',
        description: 'Lao tới húc, gây 100% AP cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Raccoon Basic Attack',
        description: 'Ném cầu ma pháp, gây 100% AP cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Frog Basic Attack',
        description: 'Phun nọc độc, gây 100% AP cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 0,
        name: 'Koala Basic Attack',
        description: 'Ném lá ma lực, gây 100% AP cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Rabbit Basic Attack',
        description: 'Đá nhanh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Chameleon Basic Attack',
        description: 'Đòn lưỡi độc, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 0,
        name: 'Ferret Basic Attack',
        description: 'Chém nhanh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 0,
        name: 'Boar Basic Attack',
        description: 'Dùng nanh húc mạnh, gây 100% ATK cho 1 mục tiêu',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },

    //Uncommon
    {
        pet_id: 0,
        name: 'Heavy Palm',
        description: 'Đòn chưởng mạnh, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Tusk Smash',
        description: 'Húc bằng mõm, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Flame Burst',
        description: 'Phun lửa, gây 105% AP phép cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 0,
        name: 'Spirit Flame',
        description: 'Gửi linh hỏa, gây 105% AP phép cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Aqua Heal',
        description: 'Phóng tia nước tấn công 1 mục tiêu, gây 105% AP',
        damage: 105,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Soothing Wind',
        description: 'Vỗ cánh tạo luồng gió, gây 105% AP cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Venom Sting',
        description: 'Đâm nọc độc, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 0,
        name: 'Talon Strike',
        description: 'Vồ bằng vuốt, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Farthest
    },
    {
        pet_id: 0,
        name: 'Tail Smash',
        description: 'Quật đuôi mạnh, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Fierce Bite',
        description: 'Cắn mạnh, gây 105% ATK cho 1 mục tiêu',
        damage: 105,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    //Epic
    {
        pet_id: 0,
        name: 'Petrify Gaze',
        description: 'Ánh mắt hóa đá, gây 125% AP cho 1 mục tiêu.',
        damage: 125,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Triple Bite',
        description: 'Ba cái đầu đồng loạt táp, gây 92% ATK cho 2 mục tiêu.',
        damage: 92,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Fire Breath',
        description: 'Hơi thở rực lửa, gây 92% AP cho 2 mục tiêu.',
        damage: 92,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Sky Slash',
        description: 'Cánh vuốt từ bầu trời, gây 125% ATK cho 1 mục tiêu.',
        damage: 125,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Multi-Head Strike',
        description: 'Những cái đầu đồng loạt tấn công, gây 92% AP cho 2 mục tiêu.',
        damage: 92,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Tail Pierce',
        description: 'Cú đâm bằng đuôi tẩm nọc, gây 125% ATK cho 1 mục tiêu.',
        damage: 125,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 0,
        name: 'Flame Wing',
        description: 'Vỗ cánh rực lửa, gây 92% AP cho 2 mục tiêu.',
        damage: 92,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 0,
        name: 'Holy Horn',
        description: 'Sừng thần lóe sáng, gây 125% AP cho 1 mục tiêu.',
        damage: 125,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Nearest
    },

    //Legendary
    {
        pet_id: 9,
        name: 'Rat Basic Attack',
        description:
            'Đánh 1 mục tiêu thấp máu nhất bằng 135% AD. Có 30% cơ hội áp dụng hiệu ứng giảm 10% DEF lên đối phương trong 2 lượt.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.LowestHP
    },
    {
        pet_id: 10,
        name: 'Ox Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD, hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 11,
        name: 'Tiger Basic Attack',
        description:
            'Đánh 1 mục tiêu gần nhất bằng 135% AD, sau đó gây thêm 30% sát thương lan lên 1 kẻ địch gần nhất.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 12,
        name: 'Cat Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP và hồi cho đồng minh có % HP thấp nhất một lượng bằng 20% sát thương gây ra.',
        damage: 135,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 13,
        name: 'Dragon Basic Attack',
        description:
            'Đánh 2 mục tiêu gần nhất bằng 100% AP, 25% cơ hội thiêu đốt 2 mục tiêu trong 1 lượt (gây sát thương bằng 15% tổng sát thương của đòn đánh).',
        damage: 100,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Nearest
    },
    {
        pet_id: 14,
        name: 'Snake Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP và có 25% cơ hội gây câm lặng lên đối phương trong 1 lượt.',
        damage: 135,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 15,
        name: 'Horse Basic Attack',
        description: 'Đánh ngẫu nhiên 2 mục tiêu bằng 100% AD và tăng 10% DEF cho bản thân trong 1 lượt.',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 16,
        name: 'Goat Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP, hồi cho đồng minh ngẫu nhiên 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 17,
        name: 'Monkey Basic Attack',
        description: 'Đánh 2 mục tiêu trước mặt bằng 100% AD, mỗi đòn đánh có 30% cơ hội giảm 10% DEF trong 1 lượt.',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.All
    },
    {
        pet_id: 18,
        name: 'Rooster Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và tăng 10% DEF cho bản thân trong 1 lượt.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 19,
        name: 'Dog Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random
    },
    {
        pet_id: 20,
        name: 'Pig Basic Attack',
        description: 'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random
    }
];
