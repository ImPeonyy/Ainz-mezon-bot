import { EAttackType, EElemental, EPetRole, ERarity } from '@/constants/Enum';

export type StatisticsSeed = {
    name: string;
    attack_type: EAttackType;
    role: EPetRole;
    element_type: EElemental | null;
    rarity: ERarity;
    hp: number;
    mana: number;
    ad: number;
    ap: number;
    ar: number;
    mr: number;
    hp_per_level: number;
    ad_per_level: number;
    ap_per_level: number;
    ar_per_level: number;
    mr_per_level: number;
};

export const statisticsSeedData: StatisticsSeed[] = [
    {
        name: 'Common',
        attack_type: EAttackType.Physical,
        role: EPetRole.Warrior,
        element_type: null,
        rarity: ERarity.Common,
        hp: 400,
        mana: 20,
        ad: 20,
        ap: 10,
        ar: 10,
        mr: 8,
        hp_per_level: 40,
        ad_per_level: 2,
        ap_per_level: 1,
        ar_per_level: 0,
        mr_per_level: 0
    },
    {
        name: 'Uncommon',
        attack_type: EAttackType.Physical,
        role: EPetRole.Warrior,
        element_type: null,
        rarity: ERarity.Uncommon,
        hp: 450,
        mana: 25,
        ad: 22,
        ap: 12,
        ar: 11,
        mr: 9,
        hp_per_level: 42,
        ad_per_level: 2,
        ap_per_level: 1,
        ar_per_level: 0,
        mr_per_level: 0
    },
    {
        name: 'Rare',
        attack_type: EAttackType.Physical,
        role: EPetRole.Warrior,
        element_type: null,
        rarity: ERarity.Rare,
        hp: 500,
        mana: 30,
        ad: 25,
        ap: 14,
        ar: 12,
        mr: 10,
        hp_per_level: 45,
        ad_per_level: 2,
        ap_per_level: 1,
        ar_per_level: 0,
        mr_per_level: 0
    },
    {
        name: 'Epic',
        attack_type: EAttackType.Physical,
        role: EPetRole.Warrior,
        element_type: null,
        rarity: ERarity.Epic,
        hp: 550,
        mana: 35,
        ad: 28,
        ap: 16,
        ar: 13,
        mr: 11,
        hp_per_level: 48,
        ad_per_level: 2,
        ap_per_level: 1,
        ar_per_level: 0,
        mr_per_level: 0
    },
    {
        name: 'Legendary',
        attack_type: EAttackType.Physical,
        role: EPetRole.Warrior,
        element_type: null,
        rarity: ERarity.Legendary,
        hp: 600,
        mana: 40,
        ad: 31,
        ap: 18,
        ar: 14,
        mr: 12,
        hp_per_level: 50,
        ad_per_level: 3,
        ap_per_level: 1,
        ar_per_level: 0,
        mr_per_level: 0
    },
    {
        name: 'Mythic',
        attack_type: EAttackType.Physical,
        role: EPetRole.Warrior,
        element_type: null,
        rarity: ERarity.Mythic,
        hp: 650,
        mana: 45,
        ad: 35,
        ap: 20,
        ar: 15,
        mr: 13,
        hp_per_level: 52,
        ad_per_level: 3,
        ap_per_level: 2,
        ar_per_level: 0,
        mr_per_level: 0
    },
    {
        name: 'Limited',
        attack_type: EAttackType.Physical,
        role: EPetRole.Warrior,
        element_type: null,
        rarity: ERarity.Limited,
        hp: 975,
        mana: 50,
        ad: 52,
        ap: 30,
        ar: 22,
        mr: 19,
        hp_per_level: 78,
        ad_per_level: 5,
        ap_per_level: 3,
        ar_per_level: 1,
        mr_per_level: 1
    }
];
