import { BATTLE } from '@/constants/Constant';
import { IFight, IFPet } from '@/constants/Type';
import { EAttackType, ETargetPosition, Prisma } from '@prisma/client';

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

export const hpAfterDealDame = (currentPet: IFPet, targetPet: IFPet) => {
    const currentAttackType = currentPet.info.autoAttack.attackType;
    const currentAd = currentPet.stats.currentStats.ad;
    const currentAp = currentPet.stats.currentStats.ap;
    const targetAr = targetPet.stats.currentStats.ar;
    const targetMr = targetPet.stats.currentStats.mr;

    const totalDamage =
        ((currentAttackType === EAttackType.Physical ? currentAd : currentAp) * currentPet.info.autoAttack.damage) /
        100;
    const actualDamage = Math.max(0, totalDamage - (currentAttackType === EAttackType.Physical ? targetAr : targetMr));
    return Math.floor(Math.max(0, targetPet.stats.currentStats.hp - actualDamage));
};

export const getPositionByHp = (currentPosition: number, targetPosition: ETargetPosition, targetPets: IFPet[]) => {
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

export const getAttackPosition = (currentPosition: number, targetPosition: ETargetPosition, targetPets: IFPet[]) => {
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

export const processTeam = (
    team: Prisma.UserPetGetPayload<{
        include: {
            pet: {
                include: { statistic: true; rarity: true; autoAttack: true; passiveSkill: true; activeSkill: true };
            };
        };
    }>[],
    teamOrder: 1 | 2
) => {
    const processedTeam: IFPet[] = [];

    for (const [index, userPet] of team.entries()) {
        if (userPet.pet.autoAttack && userPet.pet.activeSkill) {
            processedTeam.push({
                position: index * 2 + teamOrder,
                isAlive: true,
                info: {
                    nickname: userPet.nickname || userPet.pet.name,
                    level: userPet.level,
                    autoAttack: {
                        damage: userPet.pet.autoAttack.damage,
                        attackType: userPet.pet.autoAttack.attack_type,
                        attackPosition: userPet.pet.autoAttack.attack_position
                    },
                    passiveSkill: userPet.pet.passiveSkill || {},
                    activeSkill: {
                        damage: userPet.pet.activeSkill.damage || 0,
                        manaCost: userPet.pet.activeSkill.mana_cost,
                        attackType: userPet.pet.activeSkill.attack_type,
                        attackPosition: userPet.pet.activeSkill.attack_position,
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: userPet.pet.statistic.hp + userPet.additional_hp,
                        mana: userPet.pet.statistic.mana + userPet.additional_mana,
                        ad: userPet.pet.statistic.ad + userPet.additional_ad,
                        ap: userPet.pet.statistic.ap + userPet.additional_ap,
                        ar: userPet.pet.statistic.ar + userPet.additional_ar,
                        mr: userPet.pet.statistic.mr + userPet.additional_mr
                    },
                    currentStats: {
                        hp: userPet.pet.statistic.hp + userPet.additional_hp,
                        mana: userPet.pet.statistic.mana + userPet.additional_mana,
                        ad: userPet.pet.statistic.ad + userPet.additional_ad,
                        ap: userPet.pet.statistic.ap + userPet.additional_ap,
                        ar: userPet.pet.statistic.ar + userPet.additional_ar,
                        mr: userPet.pet.statistic.mr + userPet.additional_mr
                    }
                },
                effects: []
            });
        }
    }

    return processedTeam;
};

export const logPet = (pet: IFPet) => {
    const { nickname, level } = pet.info;
    const { hp, mana, ad, ap, ar, mr } = pet.stats.currentStats;

    return `
    🐾 Pet: ${nickname} (Lv.${level}) [Pos: ${pet.position}] ${pet.isAlive ? '❤️ Alive' : '💀 Dead'}
    ------------------
    HP   : ${hp}\tAD   : ${ad}\tAR   : ${ar}
    Mana : ${mana}\tAP   : ${ap}\tMR   : ${mr}
    `;
};

export const battleSimulation = (
    teamA: Prisma.UserPetGetPayload<{
        include: {
            pet: {
                include: { statistic: true; rarity: true; autoAttack: true; passiveSkill: true; activeSkill: true };
            };
        };
    }>[],
    teamB: Prisma.UserPetGetPayload<{
        include: {
            pet: {
                include: { statistic: true; rarity: true; autoAttack: true; passiveSkill: true; activeSkill: true };
            };
        };
    }>[]
) => {
    const processedTeamA: IFPet[] = processTeam(teamA, 1);
    const processedTeamB: IFPet[] = processTeam(teamB, 2);

    let teamATurnQueue: number[] = [1, 3, 5];

    let teamBTurnQueue: number[] = [2, 4, 6];

    const fight: IFight = {
        turn: 0,
        teamA: {
            1: processedTeamA[0],
            3: processedTeamA[1],
            5: processedTeamA[2]
        },
        teamB: {
            2: processedTeamB[0],
            4: processedTeamB[1],
            6: processedTeamB[2]
        }
    };
    console.log('💥 Starting battle...');
    while (teamATurnQueue.length > 0 && teamBTurnQueue.length > 0) {
        fight.turn++;
        console.log('\n\n--------------------------');
        console.log('🔄 Turn', fight.turn);
        if (fight.turn % 2 !== 0) {
            const currentPosition = teamATurnQueue.shift();
            if (currentPosition) {
                const currentPet = fight.teamA[currentPosition];
                if (currentPet) {
                    const targetPosition = getAttackPosition(
                        currentPet.position,
                        currentPet.info.autoAttack.attackPosition,
                        [fight.teamB[2], fight.teamB[4], fight.teamB[6]]
                    );
                    if (targetPosition) {
                        const deadPosition = new Set<number>();
                        for (const position of targetPosition) {
                            const targetPet = fight.teamB[position];
                            const remainingHp = hpAfterDealDame(currentPet, targetPet);
                            if (remainingHp > 0) {
                                const receivedMana = manaAfterDealDamage(targetPet.stats.currentStats.hp, remainingHp);
                                targetPet.stats.currentStats.mana += Math.ceil(
                                    targetPet.stats.originalStats.mana * receivedMana
                                );
                            } else {
                                targetPet.isAlive = false;
                                deadPosition.add(position);
                            }
                            targetPet.stats.currentStats.hp = remainingHp;
                        }
                        teamBTurnQueue = teamBTurnQueue.filter((pos) => !deadPosition.has(pos));
                        currentPet.stats.currentStats.mana += BATTLE.MANA_PER_HIT;
                    }
                    console.log(
                        currentPet.position,
                        currentPet.info.nickname,
                        ' - ',
                        currentPet.info.autoAttack.attackPosition
                    );
                    console.log(targetPosition);
                    teamATurnQueue.push(currentPosition);
                }
            }
        } else {
            const currentPosition = teamBTurnQueue.shift();
            if (currentPosition) {
                const currentPet = fight.teamB[currentPosition];
                if (currentPet) {
                    const targetPosition = getAttackPosition(
                        currentPet.position,
                        currentPet.info.autoAttack.attackPosition,
                        [fight.teamA[1], fight.teamA[3], fight.teamA[5]]
                    );
                    if (targetPosition) {
                        const deadPosition = new Set<number>();
                        for (const position of targetPosition) {
                            const targetPet = fight.teamA[position];
                            const remainingHp = hpAfterDealDame(currentPet, targetPet);
                            if (remainingHp > 0) {
                                const receivedMana = manaAfterDealDamage(targetPet.stats.currentStats.hp, remainingHp);
                                targetPet.stats.currentStats.mana += Math.ceil(
                                    targetPet.stats.originalStats.mana * receivedMana
                                );
                            } else {
                                targetPet.isAlive = false;
                                deadPosition.add(position);
                            }
                            targetPet.stats.currentStats.hp = remainingHp;
                        }
                        teamATurnQueue = teamATurnQueue.filter((pos) => !deadPosition.has(pos));
                        currentPet.stats.currentStats.mana += BATTLE.MANA_PER_HIT;
                    }
                    console.log(
                        currentPet.position,
                        currentPet.info.nickname,
                        ' - ',
                        currentPet.info.autoAttack.attackPosition
                    );
                    console.log(targetPosition);
                    teamBTurnQueue.push(currentPosition);
                }
            }
        }
        console.log('teamATurnQueue', teamATurnQueue);
        console.log('teamBTurnQueue', teamBTurnQueue);
        console.log('Team A:', logPet(fight.teamA[1]), '\t', logPet(fight.teamA[3]), '\t', logPet(fight.teamA[5]));
        console.log('Team B:', logPet(fight.teamB[2]), '\t', logPet(fight.teamB[4]), '\t', logPet(fight.teamB[6]));
    }
    return {
        isOver: teamATurnQueue.length === 0 || teamBTurnQueue.length === 0,
        winner: teamATurnQueue.length === 0 ? 'Team B' : 'Team A'
    };
};
