import { ETargetPosition } from "@prisma/client";

export const manaAfterDealDamage = (hpBefore: number, hpAfter: number) => {
    const lostHpPercent = (hpBefore - hpAfter) / hpBefore;

    switch (true) {
        case lostHpPercent > 0 && lostHpPercent < 0.25: {
            const manaPercent = 0.25;
            return manaPercent * lostHpPercent;
        }
        case lostHpPercent >= 0.25 && lostHpPercent < 0.5: {
            const manaPercent = 0.5;
            return manaPercent * lostHpPercent;
        }
        case lostHpPercent >= 0.5 && lostHpPercent < 0.8: {
            const manaPercent = 1;
            return manaPercent * lostHpPercent;
        }
        case lostHpPercent >= 0.8 && lostHpPercent < 1: {
            return 1;
        }
        default:
            return 0;
    }
};

export const hpAfterDealDame = (
    currentHp: number,
    armor: number,
    dameBasic: number,
    damePercent: number
) => {
    const totalDamage = (dameBasic * damePercent) / 100;
    const actualDamage = Math.max(0, totalDamage - armor);
    return Math.max(0, currentHp - actualDamage);
};

export const getPositionHp = (targetHp: number[], isLowestHp: boolean) => {
    const value = isLowestHp ? Math.min(...targetHp) : Math.max(...targetHp);
    const index = targetHp.indexOf(value) + 1;
    return { value, index };
};

export const getAttackPosition = (
    currentPosition: number,
    targetPosition: ETargetPosition,
    targetHp?: number[]
) => {
    switch (targetPosition) {
        case ETargetPosition.All:
            return [1, 2, 3];
        case ETargetPosition.Random:
            const randomPosition = Math.floor(Math.random() * 3) + 1;
            return [randomPosition];
        case ETargetPosition.Self:
            return [currentPosition];
        case ETargetPosition.LowestHP:
            return targetHp ? [getPositionHp(targetHp, true).index] : [];
        case ETargetPosition.HighestHP:
            return targetHp ? [getPositionHp(targetHp, false).index] : [];
        case ETargetPosition.Nearest:
            return currentPosition === 2 ? (Math.random() < 0.5 ? [1] : [3]) : [2];
        case ETargetPosition.Farthest:
            if (currentPosition === 2) {
                return Math.random() < 0.5 ? [1] : [3];
            } else if (currentPosition === 1) {
                return [3];
            } else {
                return [1];
            }
        default:
            return [];
    }
};
