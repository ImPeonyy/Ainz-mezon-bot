import { EEffect } from '@prisma/client';

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
    info: {
        nickname: string;
        level: number;
        autoAttack: {
            damage: number;
            attackType: string;
            attackPosition: string;
        };
        passiveSkill: {};
        activeSkill: {
            damage: number;
            manaCost: number;
            attackType: string;
            attackPosition: string;
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
        AX: IFPet;
        AY: IFPet;
        AZ: IFPet;
    };
    teamB: {
        BX: IFPet;
        BY: IFPet;
        BZ: IFPet;
    };
}
