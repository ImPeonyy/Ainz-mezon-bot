import { BATTLE, IBPet } from '@/constants';
import { EEffect, ERarity, EScalingType, EStat, ETargetPosition, Prisma } from '@prisma/client';

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

export const hpAfterDealAADame = (currentPet: IBPet, targetPet: IBPet) => {
    const currentAttackType = currentPet.info.autoAttack.scalingType;
    const currentAd = currentPet.stats.currentStats.ad;
    const currentAp = currentPet.stats.currentStats.ap;
    const targetAr = targetPet.stats.currentStats.ar;
    const targetMr = targetPet.stats.currentStats.mr;

    let totalDamage =
        ((currentAttackType === EScalingType.Physical ? currentAd : currentAp) * currentPet.info.autoAttack.damage) /
        100;

    if (currentAttackType === EScalingType.Hybrid) {
        totalDamage =
            ((currentAd * currentPet.info.autoAttack.damage) / 100 +
                (currentAp * currentPet.info.autoAttack.damage) / 100) /
            2;
    }

    const actualDamage = Math.max(0, totalDamage - (currentAttackType === EScalingType.Physical ? targetAr : targetMr));
    return Math.floor(Math.max(0, targetPet.stats.currentStats.hp - actualDamage));
};

export const hpAfterDealASDame = (currentPet: IBPet, targetPet: IBPet) => {
    const currentAttackType = currentPet.info.activeSkill.scalingType;
    const currentAd = currentPet.stats.currentStats.ad;
    const currentAp = currentPet.stats.currentStats.ap;
    const targetAr = targetPet.stats.currentStats.ar;
    const targetMr = targetPet.stats.currentStats.mr;

    let totalDamage =
        ((currentAttackType === EScalingType.Physical ? currentAd : currentAp) * currentPet.info.activeSkill.damage) /
        100;

    if (currentAttackType === EScalingType.Hybrid) {
        totalDamage =
            ((currentAd * currentPet.info.activeSkill.damage) / 100 +
                (currentAp * currentPet.info.activeSkill.damage) / 100) /
            2;
    }

    const actualDamage = Math.max(0, totalDamage - (currentAttackType === EScalingType.Physical ? targetAr : targetMr));
    return Math.floor(Math.max(0, targetPet.stats.currentStats.hp - actualDamage));
};

export const getPositionByHp = (currentPosition: number, targetPosition: ETargetPosition, targetPets: IBPet[]) => {
    const petList: number[] = [];
    let value = 0;
    if (targetPosition === ETargetPosition.LowestHP) {
        value = Math.min(...targetPets.map((pet) => pet.stats.currentStats.hp));
    }

    if (targetPosition === ETargetPosition.HighestHP) {
        value = Math.max(...targetPets.map((pet) => pet.stats.currentStats.hp));
    }

    for (const pet of targetPets) {
        if (pet.stats.currentStats.hp === value) {
            petList.push(pet.position);
        }
    }

    if (currentPosition === 1 || currentPosition === 2) {
        return petList.slice(0, 1);
    }

    if (currentPosition === 3 || currentPosition === 4) {
        for (const pet of petList) {
            if (pet === 3 || pet === 4) {
                return [pet];
            }
        }
        return petList.slice(0, 1);
    }

    if (currentPosition === 5 || currentPosition === 6) {
        return petList.slice(-1);
    }
};

export const getPositionByDistance = (
    currentPosition: number,
    targetPosition: ETargetPosition,
    targetPets: number[]
) => {
    if (targetPosition === ETargetPosition.Nearest) {
        const nearestPos = currentPosition + (currentPosition % 2 === 1 ? 1 : -1);

        if (targetPets.includes(nearestPos)) {
            return [nearestPos];
        }

        const closest = targetPets.reduce((prev, curr) =>
            Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev
        );

        return [closest];
    }

    if (targetPosition === ETargetPosition.Farthest) {
        if (currentPosition === 1 || currentPosition === 2) {
            return targetPets.slice(-1);
        }

        if (currentPosition === 3) {
            if (targetPets.includes(2)) {
                return [2];
            }
            if (targetPets.includes(6)) {
                return [6];
            }
            return [4];
        }

        if (currentPosition === 4) {
            if (targetPets.includes(1)) {
                return [1];
            }
            if (targetPets.includes(5)) {
                return [5];
            }
            return [3];
        }

        if (currentPosition === 5 || currentPosition === 6) {
            return targetPets.slice(0, 1);
        }
    }
};

export const getAttackPosition = (currentPosition: number, targetPosition: ETargetPosition, targetPets: IBPet[]) => {
    const alivePets = targetPets.filter((pet) => pet.isAlive);

    switch (targetPosition) {
        case ETargetPosition.Random:
            return [alivePets[Math.floor(Math.random() * alivePets.length)].position];

        case ETargetPosition.LowestHP:
            return getPositionByHp(currentPosition, ETargetPosition.LowestHP, alivePets);

        case ETargetPosition.HighestHP:
            return getPositionByHp(currentPosition, ETargetPosition.HighestHP, alivePets);

        case ETargetPosition.Nearest:
            return getPositionByDistance(
                currentPosition,
                ETargetPosition.Nearest,
                alivePets.map((pet) => pet.position)
            );

        case ETargetPosition.Farthest:
            return getPositionByDistance(
                currentPosition,
                ETargetPosition.Farthest,
                alivePets.map((pet) => pet.position)
            );

        default:
            return [...alivePets.map((pet) => pet.position)];
    }
};

export const getCurrentManaAfterReceive = (currentMana: number, receivedMana: number, manaCost: number) => {
    const manaAfterReceive = currentMana + receivedMana;
    if (manaAfterReceive > manaCost) {
        return manaCost;
    }
    return manaAfterReceive;
};

export const processTeam = (
    team: Prisma.TeamMemberGetPayload<{
        include: {
            userPet: {
                include: {
                    pet: {
                        include: {
                            statistic: true;
                            rarity: true;
                            autoAttack: true;
                            passiveSkill: { include: { effects: true } };
                            activeSkill: { include: { effects: true } };
                        };
                    };
                };
            };
        };
    }>[],
    teamOrder: 1 | 2
) => {
    const processedTeam: IBPet[] = [];

    for (const [index, member] of team.entries()) {
        if (member.userPet.pet.autoAttack && member.userPet.pet.activeSkill) {
            processedTeam.push({
                id: member.userPet.id,
                position: index * 2 + teamOrder,
                isAlive: true,
                info: {
                    petName: member.userPet.pet.name,
                    nickname: member.userPet.nickname || member.userPet.pet.name,
                    mezon_emoji_id: member.userPet.pet.mezon_emoji_id,
                    avatar: member.userPet.pet.avatar || '',
                    rarity: member.userPet.pet.rarity.type as ERarity,
                    level: member.userPet.level,
                    exp: member.userPet.exp,
                    autoAttack: {
                        damage: member.userPet.pet.autoAttack.damage,
                        scalingType: member.userPet.pet.autoAttack.scaling_type,
                        attackPosition: member.userPet.pet.autoAttack.attack_position
                    },
                    passiveSkill: member.userPet.pet.passiveSkill || {},
                    activeSkill: {
                        damage: member.userPet.pet.activeSkill.damage || 0,
                        manaCost: member.userPet.pet.activeSkill.mana_cost,
                        scalingType: member.userPet.pet.activeSkill.scaling_type,
                        attackPosition: member.userPet.pet.activeSkill.attack_position,
                        effects: member.userPet.pet.activeSkill.effects
                            ? member.userPet.pet.activeSkill.effects.map((effect) => ({
                                  effectTarget: effect.effect_target,
                                  effectTargetPosition: effect.effect_target_position,
                                  effectType: effect.effect,
                                  effectStat: effect.effect_stat,
                                  scalingType: effect.scaling_type,
                                  duration: 1,
                                  value: effect.value
                              }))
                            : []
                    }
                },
                stats: {
                    statsPerLevel: {
                        hp: member.userPet.pet.statistic.hp_per_level,
                        mana: 0,
                        ad: member.userPet.pet.statistic.ad_per_level,
                        ap: member.userPet.pet.statistic.ap_per_level,
                        ar: member.userPet.pet.statistic.ar_per_level,
                        mr: member.userPet.pet.statistic.mr_per_level
                    },
                    originalStats: {
                        hp: member.userPet.pet.statistic.hp + member.userPet.additional_hp,
                        mana: member.userPet.pet.statistic.mana + member.userPet.additional_mana,
                        ad: member.userPet.pet.statistic.ad + member.userPet.additional_ad,
                        ap: member.userPet.pet.statistic.ap + member.userPet.additional_ap,
                        ar: member.userPet.pet.statistic.ar + member.userPet.additional_ar,
                        mr: member.userPet.pet.statistic.mr + member.userPet.additional_mr
                    },
                    currentStats: {
                        hp: member.userPet.pet.statistic.hp + member.userPet.additional_hp,
                        mana: member.userPet.pet.statistic.mana + member.userPet.additional_mana,
                        ad: member.userPet.pet.statistic.ad + member.userPet.additional_ad,
                        ap: member.userPet.pet.statistic.ap + member.userPet.additional_ap,
                        ar: member.userPet.pet.statistic.ar + member.userPet.additional_ar,
                        mr: member.userPet.pet.statistic.mr + member.userPet.additional_mr
                    }
                },
                effects: []
            });
        }
    }

    return processedTeam;
};

export const processEffects = (pet: IBPet) => {
    for (let i = pet.effects.length - 1; i >= 0; i--) {
        const effect = pet.effects[i];
        let appliedValue = 0;
        if (effect.scalingType === EScalingType.Physical) {
            appliedValue = (pet.stats.currentStats.ad * effect.value) / 100;
        } else {
            appliedValue = (pet.stats.currentStats.ap * effect.value) / 100;
        }

        switch (effect.effectType) {
            case EEffect.Heal:
                if (pet.stats.currentStats.hp + appliedValue > pet.stats.originalStats.hp) {
                    pet.stats.currentStats.hp = pet.stats.originalStats.hp;
                } else {
                    pet.stats.currentStats.hp += appliedValue;
                }
                break;
            case EEffect.DOT:
                if (pet.stats.currentStats.hp - appliedValue < 0) {
                    pet.stats.currentStats.hp = 0;
                } else {
                    pet.stats.currentStats.hp -= appliedValue;
                }
                break;
            case EEffect.BuffStat:
                if (effect.effectStat === EStat.Atk) {
                    pet.stats.currentStats.ad += appliedValue;
                    pet.stats.currentStats.ap += appliedValue;
                } else if (effect.effectStat === EStat.Def) {
                    pet.stats.currentStats.ar += appliedValue;
                    pet.stats.currentStats.mr += appliedValue;
                }
                break;
            case EEffect.DebuffStat:
                if (effect.effectStat === EStat.Atk) {
                    pet.stats.currentStats.ad -= appliedValue;
                    pet.stats.currentStats.ap -= appliedValue;
                } else if (effect.effectStat === EStat.Def) {
                    pet.stats.currentStats.ar -= appliedValue;
                    pet.stats.currentStats.mr -= appliedValue;
                }
                break;
            case EEffect.RemoveBuff:
                break;
            case EEffect.RemoveDebuff:
                break;
            case EEffect.Silence:
                break;
            case EEffect.ReducedHealing:
                break;
            case EEffect.LifeSteal:
                break;
            case EEffect.Revive:
                break;
        }

        // giảm duration
        effect.duration--;

        // nếu hết hạn thì xoá khỏi mảng
        if (effect.duration <= 0) {
            pet.effects.splice(i, 1);
        }
    }
};

export const processTurn = (
    attackerQueue: number[],
    attackerTeam: Record<number, IBPet>,
    defenderQueue: number[],
    defenderTeam: Record<number, IBPet>,
    defenderPositions: number[]
) => {
    const currentPosition = attackerQueue.shift();
    if (!currentPosition) return;

    const currentPet = attackerTeam[currentPosition];
    if (!currentPet) return;

    // // --- Apply effects ---
    // if (currentPet.effects.length > 0) {
    //     for (const effect of currentPet.effects) {
    //         if (effect.duration > 0) {
    //             effect.duration--;
    //         }
    //     }
    // }

    // --- Active Skill ---
    if (currentPet.stats.currentStats.mana === currentPet.info.activeSkill.manaCost) {
        // --- Use active skill attack ---
        if (currentPet.info.activeSkill.attackPosition && currentPet.info.activeSkill.damage) {
            const ASTargetPosition = getAttackPosition(
                currentPet.position,
                currentPet.info.activeSkill.attackPosition,
                defenderPositions.map((pos) => defenderTeam[pos])
            );

            if (ASTargetPosition) {
                const deadPosition = new Set<number>();
                for (const position of ASTargetPosition) {
                    const targetPet = defenderTeam[position];
                    const remainingHp = hpAfterDealASDame(currentPet, targetPet);
                    if (remainingHp > 0) {
                        const receivedManaPercent = manaAfterDealDamage(targetPet.stats.currentStats.hp, remainingHp);
                        const receivedMana = Math.ceil(targetPet.stats.currentStats.mana * receivedManaPercent);
                        targetPet.stats.currentStats.mana = getCurrentManaAfterReceive(
                            targetPet.stats.currentStats.mana,
                            receivedMana,
                            targetPet.info.activeSkill.manaCost
                        );
                    } else {
                        targetPet.isAlive = false;
                        deadPosition.add(position);
                    }
                    targetPet.stats.currentStats.hp = remainingHp;
                }
                for (let i = defenderQueue.length - 1; i >= 0; i--) {
                    if (deadPosition.has(defenderQueue[i])) {
                        defenderQueue.splice(i, 1);
                    }
                }
            }
        }
        currentPet.stats.currentStats.mana = 0;
        attackerQueue.push(currentPosition);
        return;
    }

    // --- Auto Attack ---
    const AATargetPosition = getAttackPosition(
        currentPet.position,
        currentPet.info.autoAttack.attackPosition,
        defenderPositions.map((pos) => defenderTeam[pos])
    );

    if (AATargetPosition) {
        const deadPosition = new Set<number>();
        for (const position of AATargetPosition) {
            const targetPet = defenderTeam[position];
            const remainingHp = hpAfterDealAADame(currentPet, targetPet);
            if (remainingHp > 0) {
                const receivedManaPercent = manaAfterDealDamage(targetPet.stats.currentStats.hp, remainingHp);
                const receivedMana = Math.ceil(targetPet.stats.currentStats.mana * receivedManaPercent);
                targetPet.stats.currentStats.mana = getCurrentManaAfterReceive(
                    targetPet.stats.currentStats.mana,
                    receivedMana,
                    targetPet.info.activeSkill.manaCost
                );
            } else {
                targetPet.isAlive = false;
                deadPosition.add(position);
            }
            targetPet.stats.currentStats.hp = remainingHp;
        }
        for (let i = defenderQueue.length - 1; i >= 0; i--) {
            if (deadPosition.has(defenderQueue[i])) {
                defenderQueue.splice(i, 1);
            }
        }

        // attacker gain mana when doing auto attack
        currentPet.stats.currentStats.mana = getCurrentManaAfterReceive(
            currentPet.stats.currentStats.mana,
            BATTLE.MANA_PER_HIT,
            currentPet.info.activeSkill.manaCost
        );
    }
    attackerQueue.push(currentPosition);
};
