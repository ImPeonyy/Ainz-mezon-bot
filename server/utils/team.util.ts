import { ERarity, Prisma } from '@prisma/client';
import { RARITY_CP_MULTIPLIERS } from '@/constants';
import { getAdditionalStats, getPetLevelFromExp } from '@/utils';

export const isValidPosition = (pos: number): boolean => pos >= 1 && pos <= 3;

const calculatePetCP = (
    member: Prisma.TeamMemberGetPayload<{ include: { userPet: { include: { pet: { include: { statistic: true; rarity: true } } } } } }>
): number => {
    const petLevel = getPetLevelFromExp(member.userPet.exp);
    const totalStats = {
        hp: member.userPet.pet.statistic.hp + getAdditionalStats(member.userPet.pet.statistic.hp_per_level, petLevel),
        ad: member.userPet.pet.statistic.ad + getAdditionalStats(member.userPet.pet.statistic.ad_per_level, petLevel),
        ap: member.userPet.pet.statistic.ap + getAdditionalStats(member.userPet.pet.statistic.ap_per_level, petLevel),
        ar: member.userPet.pet.statistic.ar + getAdditionalStats(member.userPet.pet.statistic.ar_per_level, petLevel),
        mr: member.userPet.pet.statistic.mr + getAdditionalStats(member.userPet.pet.statistic.mr_per_level, petLevel)
    }
    const totalBaseStats = totalStats.hp + totalStats.ad + totalStats.ap + totalStats.ar + totalStats.mr;
    const baseCP = Math.floor(totalBaseStats * (1 + petLevel * 0.1));
    const rarityMultiplier = RARITY_CP_MULTIPLIERS[member.userPet.pet.rarity.type];
    const finalCP = Math.floor(baseCP * rarityMultiplier);
    return finalCP;
};

export const calculateTeamCP = (
    team: Prisma.TeamGetPayload<{
        include: {
            members: { include: { userPet: { include: { pet: { include: { statistic: true; rarity: true } } } } } };
        };
    }>
): number => {
    let totalCP = 0;

    for (const pet of team.members) {
        totalCP += calculatePetCP(pet);
    }

    return totalCP;
};