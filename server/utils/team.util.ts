import { ERarity, Prisma, User } from '@prisma/client';
import { EAddPetToTeam, ENormalStatus, PositionPetMap, RARITY_CP_MULTIPLIERS } from '@/constants';
import { getAdditionalStats, getPetLevelFromExp, getRandomPastelHexColor } from '@/utils';
import {
    ButtonComponent,
    ChannelMessageContent,
    EButtonMessageStyle,
    EMessageComponentType,
    IMessageActionRow
} from 'mezon-sdk';

export const isValidPosition = (pos: number): boolean => pos >= 1 && pos <= 3;

const calculatePetCP = (
    member: Prisma.TeamMemberGetPayload<{
        include: { userPet: { include: { pet: { include: { statistic: true; rarity: true } } } } };
    }>
): number => {
    const petLevel = getPetLevelFromExp(member.userPet.exp);
    const totalStats = {
        hp: member.userPet.pet.statistic.hp + getAdditionalStats(member.userPet.pet.statistic.hp_per_level, petLevel),
        ad: member.userPet.pet.statistic.ad + getAdditionalStats(member.userPet.pet.statistic.ad_per_level, petLevel),
        ap: member.userPet.pet.statistic.ap + getAdditionalStats(member.userPet.pet.statistic.ap_per_level, petLevel),
        ar: member.userPet.pet.statistic.ar + getAdditionalStats(member.userPet.pet.statistic.ar_per_level, petLevel),
        mr: member.userPet.pet.statistic.mr + getAdditionalStats(member.userPet.pet.statistic.mr_per_level, petLevel)
    };
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

export const teamInfoMessage = (
    team: Prisma.TeamGetPayload<{ include: { members: { include: { userPet: { include: { pet: true } } } } } }>
) => {
    let messagePayload: ChannelMessageContent = {
        t: `Your team "${team.name}" contains the following pets:\nCombat Power: ${team.combat_power}\n`,
        ej: []
    };

    const Position = ['1️⃣', '2️⃣', '3️⃣'];

    team.members.forEach((member) => {
        const currentLevel = getPetLevelFromExp(member.userPet.exp);
        messagePayload.t += `${Position[member.position - 1]}: `;
        messagePayload.t += `Lv. ${currentLevel} - `;
        messagePayload.ej?.push({
            emojiid: member.userPet.pet.mezon_emoji_id,
            s: messagePayload.t?.length || 0,
            e: messagePayload.t?.length || 0 + 1
        });
        messagePayload.t += ` ${member.userPet.nickname || member.userPet.pet.name}\n`;
    });

    return messagePayload;
};

export const getAddPetToTeamMessage = (
    user: User,
    userPet: Prisma.UserPetGetPayload<{
        include: {
            pet: true;
        };
    }>[],
    isLoading: boolean = false,
    message: string = 'Add Pet to Team'
) => {
    const cancelButton: ButtonComponent = {
        id: ENormalStatus.CANCEL,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Cancel',
            style: EButtonMessageStyle.DANGER
        }
    };
    const addPetsButton: ButtonComponent = {
        id: ENormalStatus.EXECUTE,
        type: EMessageComponentType.BUTTON,
        component: {
            label: 'Add Pets',
            style: EButtonMessageStyle.SECONDARY
        }
    };

    const messageActionRow: IMessageActionRow = {
        components: [cancelButton, addPetsButton]
    };

    const listPet = userPet.map((userPet) => {
        const petLevel = getPetLevelFromExp(userPet.exp);
        return {
            label:
                userPet.pet.name === userPet.nickname
                    ? `Lv.${petLevel}: ${userPet.pet.name}`
                    : `Lv.${petLevel}: ${userPet.pet.name} (${userPet.nickname})`,
            value: userPet.id
        };
    });

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: `👥 Add Pet to Team`,
        description: `Select pets for your team`,
        thumbnail: { url: user.avatar },
        fields: [
            {
                name: 'The position 1️⃣ in your team:',
                value: '',
                inputs: {
                    id: EAddPetToTeam.POSITION_1,
                    type: EMessageComponentType.SELECT,
                    component: {
                        options: listPet
                    }
                }
            },
            {
                name: 'The position 2️⃣ in your team:',
                value: '',
                inputs: {
                    id: EAddPetToTeam.POSITION_2,
                    type: EMessageComponentType.SELECT,
                    component: {
                        options: listPet
                    }
                }
            },
            {
                name: 'The position 3️⃣ in your team:',
                value: '',
                inputs: {
                    id: EAddPetToTeam.POSITION_3,
                    type: EMessageComponentType.SELECT,
                    component: {
                        options: listPet
                    }
                }
            },
            {
                name: message,
                value: ''
            }
        ]
    };
    const messagePayload: ChannelMessageContent = {
        embed: [embedConfig],
        components: isLoading ? [] : [messageActionRow]
    };

    return messagePayload;
};

export const findDuplicatePositions = (petsInTeam: PositionPetMap) => {
    const idMap = new Map<number, string[]>();
    const duplicates: string[][] = [];

    for (const [pos, petId] of Object.entries(petsInTeam)) {
        if (!idMap.has(petId)) idMap.set(petId, []);
        idMap.get(petId)!.push(pos);
    }

    for (const positions of idMap.values()) {
        if (positions.length > 1) duplicates.push(positions);
    }

    return duplicates;
};
