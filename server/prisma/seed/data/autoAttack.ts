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
    target_count: number;
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
                    attack_position: autoAttack.attack_position,
                    target_count: autoAttack.target_count
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
                    attack_position: autoAttack.attack_position,
                    target_count: autoAttack.target_count
                }
            });
        }
    }
};

export const autoAttackSeedData: AutoAttackSeed[] = [
    {
        pet_id: 9,
        name: 'Rat Basic Attack',
        description:
            'Đánh 1 mục tiêu thấp máu nhất bằng 135% AD. Có 30% cơ hội áp dụng hiệu ứng giảm 10% DEF lên đối phương trong 2 lượt.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.LowestHP,
        target_count: 1
    },
    {
        pet_id: 10,
        name: 'Ox Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD, hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random,
        target_count: 1
    },
    {
        pet_id: 11,
        name: 'Tiger Basic Attack',
        description:
            'Đánh 1 mục tiêu gần nhất bằng 135% AD, sau đó gây thêm 30% sát thương lan lên 1 kẻ địch gần nhất.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Nearest,
        target_count: 1
    },
    {
        pet_id: 12,
        name: 'Cat Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP và hồi cho đồng minh có % HP thấp nhất một lượng bằng 20% sát thương gây ra.',
        damage: 135,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random,
        target_count: 1
    },
    {
        pet_id: 13,
        name: 'Dragon Basic Attack',
        description:
            'Đánh 2 mục tiêu gần nhất bằng 100% AP, 25% cơ hội thiêu đốt 2 mục tiêu trong 1 lượt (gây sát thương bằng 15% tổng sát thương của đòn đánh).',
        damage: 100,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Nearest,
        target_count: 2
    },
    {
        pet_id: 14,
        name: 'Snake Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP và có 25% cơ hội gây câm lặng lên đối phương trong 1 lượt.',
        damage: 135,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random,
        target_count: 1
    },
    {
        pet_id: 15,
        name: 'Horse Basic Attack',
        description:
            'Đánh ngẫu nhiên 2 mục tiêu bằng 100% AD và tăng 10% DEF cho bản thân trong 1 lượt.',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random,
        target_count: 2
    },
    {
        pet_id: 16,
        name: 'Goat Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AP, hồi cho đồng minh ngẫu nhiên 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Magical,
        attack_position: ETargetPosition.Random,
        target_count: 1
    },
    {
        pet_id: 17,
        name: 'Monkey Basic Attack',
        description:
            'Đánh 2 mục tiêu trước mặt bằng 100% AD, mỗi đòn đánh có 30% cơ hội giảm 10% DEF trong 1 lượt.',
        damage: 100,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Front,
        target_count: 2
    },
    {
        pet_id: 18,
        name: 'Rooster Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và tăng 10% DEF cho bản thân trong 1 lượt.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random,
        target_count: 1
    },
    {
        pet_id: 19,
        name: 'Dog Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random,
        target_count: 1
    },
    {
        pet_id: 20,
        name: 'Pig Basic Attack',
        description:
            'Đánh ngẫu nhiên 1 mục tiêu bằng 135% AD và hồi cho bản thân 5% HP tối đa.',
        damage: 135,
        attack_type: EAttackType.Physical,
        attack_position: ETargetPosition.Random,
        target_count: 1
    }
];
