import { EAttackType, EEffect, ETargetPosition } from '@prisma/client';

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
    trigger: string | null;
    action: string | null;
    targetRaw: string | null;
};

export interface IFEffectValue {
    id: number;
    effectType: EEffect;
    duration: number;
    value: number;
}

export interface IFStats {
    hp: number;
    mana: number;
    ad: number;
    ap: number;
    ar: number;
    mr: number;
}

export interface IFPet {
    position: number;
    isAlive: boolean;
    info: {
        nickname: string;
        level: number;
        autoAttack: {
            damage: number;
            attackType: EAttackType;
            attackPosition: ETargetPosition;
        };
        passiveSkill: {};
        activeSkill: {
            damage: number;
            manaCost: number;
            attackType: EAttackType | null;
            attackPosition: ETargetPosition | null;
            effects: IFEffectValue[];
        };
    };
    stats: {
        originalStats: IFStats;
        currentStats: IFStats;
    };
    effects: IFEffectValue[];
}

export interface IFight {
    turn: number;
    teamA: {
        1: IFPet;
        3: IFPet;
        5: IFPet;
    };
    teamB: {
        2: IFPet;
        4: IFPet;
        6: IFPet;
    };
}
