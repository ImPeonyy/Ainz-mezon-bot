import { IFPet } from "@/constants/Type";
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

export const getPositionHp = (pets: IFPet[], isLowestHp: boolean, currentPosition: number) => {
    let targetHp = isLowestHp ? Infinity : -Infinity;
    let sameHpList: number[] = [];

    const targetPositions = currentPosition % 2 === 1 ? [2, 4, 6] : [1, 3, 5];

    pets.forEach((pet, i) => {
        if (!pet.isAlive) return;

        const currentHp = pet.stats.currentStats.hp;
        const shouldUpdate = isLowestHp ? currentHp < targetHp : currentHp > targetHp;

        if (shouldUpdate) {
            targetHp = currentHp;
            sameHpList = [targetPositions[i]];
        } else if (currentHp === targetHp) {
            sameHpList.push(targetPositions[i]);
        }
    });

    const adjacentPosition = currentPosition % 2 === 1 ? currentPosition + 1 : currentPosition - 1;
    if (sameHpList.includes(adjacentPosition)) {
        return adjacentPosition;
    }

    return sameHpList.sort((a, b) =>
        Math.abs(currentPosition - a) - Math.abs(currentPosition - b)
    )[0];
};

export const getAttackPosition = (
    currentPosition: number,
    targetPosition: ETargetPosition,
    pets?: IFPet[]
) => {
    const enemyTargets = currentPosition % 2 === 1 ? [2, 4, 6] : [1, 3, 5];
    const alivePositions = pets ? enemyTargets.filter((_, i) => pets[i]?.isAlive) : enemyTargets;

    switch (targetPosition) {
        case ETargetPosition.All:
            return alivePositions;

        case ETargetPosition.Random:
            return [alivePositions[Math.floor(Math.random() * alivePositions.length)]]

        case ETargetPosition.LowestHP:
            return pets ? [getPositionHp(pets, true, currentPosition)] : [];
            
        case ETargetPosition.HighestHP:
            return pets ? [getPositionHp(pets, false, currentPosition)] : [];

        case ETargetPosition.Nearest:
            const nearestPos = currentPosition + (currentPosition % 2 === 1 ? 1 : -1);
            return alivePositions.includes(nearestPos) ? [nearestPos] : [alivePositions.sort((a, b) => Math.abs(currentPosition - a) - Math.abs(currentPosition - b))[0]];

        case ETargetPosition.Farthest:
            let farthestTargets: number[];
            if (currentPosition === 1 || currentPosition === 6) {
                farthestTargets = [currentPosition === 1 ? 6 : 1];
            } else if (currentPosition === 2 || currentPosition === 5) {
                farthestTargets = [currentPosition === 2 ? 5 : 2];
            } else {
                farthestTargets = currentPosition === 3 ? [2, 6] : [1, 5];
            }
            
            const aliveFarthest = farthestTargets.filter(pos => alivePositions.includes(pos));
            return aliveFarthest.length > 0 ? [aliveFarthest[Math.floor(Math.random() * aliveFarthest.length)]] :
                   [alivePositions.sort((a, b) => Math.abs(currentPosition - b) - Math.abs(currentPosition - a))[0]];

        default:
            return [];
    }
};
