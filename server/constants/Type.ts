import { EEffect, EEffectTarget, ERarity, EStat, EScalingType, ETargetPosition } from '@prisma/client';

export interface IMeme {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
}

export interface IActionGif {
    results: {
        anime_name: string;
        url: string;
    }[];
}

export type ParsedAction = {
    trigger?: string | null;
    action: string | null;
    targetRaw: string | null;
};

export interface IBEffect {
    effectTarget: EEffectTarget;
    effectTargetPosition: ETargetPosition;
    effectType: EEffect;
    effectStat: EStat | null;
    scalingType: EScalingType | null;
    duration: number;
    value: number;
}

export interface IBStats {
    hp: number;
    mana: number;
    ad: number;
    ap: number;
    ar: number;
    mr: number;
}

export interface IBPet {
    id: number;
    position: number;
    isAlive: boolean;
    info: {
        nickname: string;
        mezon_emoji_id: string;
        avatar: string;
        rarity: ERarity;
        level: number;
        exp: number;
        autoAttack: {
            damage: number;
            scalingType: EScalingType;
            attackPosition: ETargetPosition;
        };
        passiveSkill: {};
        activeSkill: {
            damage: number;
            manaCost: number;
            scalingType: EScalingType | null;
            attackPosition: ETargetPosition | null;
            effects: IBEffect[];
        };
    };
    stats: {
        originalStats: IBStats;
        currentStats: IBStats;
    };
    effects: IBEffect[];
}

export interface IBattle {
    turn: number;
    teamA: {
        1: IBPet;
        3: IBPet;
        5: IBPet;
    };
    teamB: {
        2: IBPet;
        4: IBPet;
        6: IBPet;
    };
}
