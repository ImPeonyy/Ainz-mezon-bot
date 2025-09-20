import { ACTIONS, AINZ_THUMBNAIL, FAV_COLOR, IBattle } from '@/constants';
import { ChannelMessageContent, EmojiOnMessage, IInteractiveMessageProps } from 'mezon-sdk';
import { ERarity, Prisma, User } from '@prisma/client';
import { expToPetLevel, getAdditionalStats, getPetLevelFromExp, getRandomPastelHexColor, getRarityColor, getUrlEmoji } from '@/utils';

export const textMessage = (message: string) => {
    const messagePayload: ChannelMessageContent = {
        t: message
    };

    return messagePayload;
};

export const embedMessage = (embed: IInteractiveMessageProps) => {
    const embedPayload: IInteractiveMessageProps = embed;
    const messagePayload: ChannelMessageContent = {
        embed: [embedPayload]
    };
    return messagePayload;
};

export const emojiMessage = (emoji: EmojiOnMessage[]) => {
    const messagePayload: ChannelMessageContent = {
        ej: emoji
    };
    return messagePayload;
};

export const getHuntMessage = (emojis: EmojiOnMessage[]) => {
    let messagePayload: ChannelMessageContent = {
        t: '🎯 Luck has smiled upon you! 5 pets have been captured:\n',
        ej: []
    };

    emojis.forEach((emoji) => {
        messagePayload.ej?.push({
            emojiid: emoji.emojiid,
            s: messagePayload.t?.length || 0,
            e: messagePayload.t?.length || 0 + 1
        });
        messagePayload.t += `   `;
    });

    return messagePayload;
};

export const getBagMessage = (
    pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[],
    bag: Prisma.UserPetGetPayload<{ include: { pet: true } }>[]
) => {
    let messagePayload: ChannelMessageContent = {
        t: '🎒 Current pets in your collection:\n',
        ej: []
    };

    const petCountMap = new Map<number, number>();
    bag.forEach((userPet) => {
        const petId = userPet.pet.id;
        const count = userPet.count ?? 0;
        petCountMap.set(petId, (petCountMap.get(petId) || 0) + count);
    });

    const petsByRarity = pets.reduce(
        (acc, pet) => {
            const rarity = pet.rarity?.name || 'Common';
            if (!acc[rarity]) {
                acc[rarity] = [];
            }
            acc[rarity].push(pet);
            return acc;
        },
        {} as Record<string, Prisma.PetGetPayload<{ include: { rarity: true } }>[]>
    );

    const rarityOrder = Object.values(ERarity);

    rarityOrder.forEach((rarity) => {
        if (petsByRarity[rarity] && petsByRarity[rarity].length > 0) {
            messagePayload.t += `\n                              **${rarity.toUpperCase()}**\n`;

            petsByRarity[rarity].forEach((pet, index) => {
                const count = petCountMap.get(pet.id) || 0;
                const countStr = String(count).padStart(2, '0');

                messagePayload.ej?.push({
                    emojiid: pet.mezon_emoji_id,
                    s: messagePayload.t?.length || 0,
                    e: (messagePayload.t?.length || 0) + 1
                });
                messagePayload.t += ' ';
                messagePayload.t += count === 0 ? '        ' : `(${countStr})`;

                if ((index + 1) % 5 === 0) {
                    messagePayload.t += '\n';
                } else {
                    messagePayload.t += '   \t';
                }
            });
            if (petsByRarity[rarity].length % 5 !== 0) {
                messagePayload.t += '\n';
            }
        }
    });

    return messagePayload;
};

export const getBagMessageByRarity = (
    pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[],
    bag: Prisma.UserPetGetPayload<{ include: { pet: true } }>[]
) => {
    let messagePayload: ChannelMessageContent = {
        t: '🎒 Current pets in your collection:',
        ej: []
    };

    const petCountMap = new Map<number, number>();
    bag.forEach((userPet) => {
        const petId = userPet.pet.id;
        const count = userPet.count ?? 0;
        petCountMap.set(petId, (petCountMap.get(petId) || 0) + count);
    });

    const petsByRarity = pets.reduce(
        (acc, pet) => {
            const rarity = pet.rarity?.name || 'Common';
            if (!acc[rarity]) {
                acc[rarity] = [];
            }
            acc[rarity].push(pet);
            return acc;
        },
        {} as Record<string, Prisma.PetGetPayload<{ include: { rarity: true } }>[]>
    );

    const rarityOrder = Object.values(ERarity);

    rarityOrder.forEach((rarity) => {
        if (petsByRarity[rarity] && petsByRarity[rarity].length > 0) {
            messagePayload.t += `\n            **${rarity.toUpperCase()}**\n`;

            petsByRarity[rarity].forEach((pet) => {
                const count = petCountMap.get(pet.id) || 0;
                const countStr = count === 0 ? '' : `    |    (${String(count).padStart(2, '0')})`;

                // gắn emoji mapping
                messagePayload.ej?.push({
                    emojiid: pet.mezon_emoji_id,
                    s: messagePayload.t?.length || 0,
                    e: (messagePayload.t?.length || 0) + 1
                });

                // format mới: emoji (00) - Name
                messagePayload.t += ` - ${pet.name} ${countStr}\n`;
            });
        }
    });

    return messagePayload;
};

export const teamInfoMessage = (
    team: Prisma.TeamGetPayload<{ include: { members: { include: { userPet: { include: { pet: true } } } } } }>,
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

export const getActionMessage = (action: string, actor: string, target?: string) => {
    if (!ACTIONS[action]) {
        return {
            t: `**${actor}** does something mysterious...`
        };
    }

    const actionConfig = ACTIONS[action];

    const message = actionConfig.getMessage(actor, target);

    return {
        t: message
    };
};

export const getDexMessage = (
    pet: Prisma.PetGetPayload<{
        include: { statistic: true; rarity: true; autoAttack: true; passiveSkill: true; activeSkill: true };
    }>
) => {
    const statistic = pet.statistic;

    const messageContent = [
        {
            name: 'Description',
            value: pet?.description || 'No description',
            inline: false
        }
    ];

    if (statistic) {
        messageContent.push(
            { name: '💎 Rarity', value: statistic.rarity, inline: true },
            { name: '🎭 Role', value: statistic.role, inline: true },
            { name: '⚔️ Attack type', value: statistic.scaling_type, inline: true },
            { name: '❤️', value: statistic.hp.toString(), inline: true },
            { name: '🗡️', value: statistic.ad.toString(), inline: true },
            { name: '🛡️', value: statistic.ar.toString(), inline: true },
            { name: '💧', value: statistic.mana.toString(), inline: true },
            { name: '💫', value: statistic.ap.toString(), inline: true },
            { name: '⛊', value: statistic.mr.toString(), inline: true }
        );
    }

    return embedMessage({
        color: getRarityColor(statistic.rarity),
        title: `${pet.name} Information 🔍`,
        thumbnail: { url: AINZ_THUMBNAIL },
        fields: messageContent,
        image: {
            url: getUrlEmoji(pet.mezon_emoji_id)
        },
        footer: {
            text: `📙 Ainz Mezon Bot • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    });
};

export const getMyDexMessage = (
    userPet: Prisma.UserPetGetPayload<{
        include: {
            pet: {
                include: { statistic: true; rarity: true; autoAttack: true; passiveSkill: true; activeSkill: true };
            };
        };
    }>,
    userAvatar: string
) => {
    const statistic = userPet.pet.statistic;

    const messageContent = [
        {
            name: 'Description',
            value: userPet.pet?.description || 'No description',
            inline: false
        }
    ];

    const currentLevel = getPetLevelFromExp(userPet.exp);

    if (statistic) {
        messageContent.push(
            { name: '🏷️ Nickname', value: userPet.nickname || userPet.pet.name, inline: true },
            { name: '📊 Level', value: currentLevel.toString() || '0', inline: true },
            {
                name: '✨ Exp',
                value: `${userPet.exp.toString() || '0'}/${expToPetLevel(currentLevel + 1 || 0)}`,
                inline: true
            },
            { name: '💎 Rarity', value: statistic.rarity, inline: true },
            { name: '🎭 Role', value: statistic.role, inline: true },
            { name: '⚔️ Attack type', value: statistic.scaling_type, inline: true },
            { name: '❤️', value: (statistic.hp + getAdditionalStats(statistic.hp_per_level, currentLevel)).toString(), inline: true },
            { name: '🗡️', value: (statistic.ad + getAdditionalStats(statistic.ad_per_level, currentLevel)).toString(), inline: true },
            { name: '🛡️', value: (statistic.ar + getAdditionalStats(statistic.ar_per_level, currentLevel)).toString(), inline: true },
            { name: '💧', value: (statistic.mana).toString(), inline: true },
            { name: '💫', value: (statistic.ap + getAdditionalStats(statistic.ap_per_level, currentLevel)).toString(), inline: true },
            { name: '⛊', value: (statistic.mr + getAdditionalStats(statistic.mr_per_level, currentLevel)).toString(), inline: true }
        );
    }

    const embedConfig: IInteractiveMessageProps = {
        color: getRarityColor(statistic.rarity),
        title: `${userPet.pet.name} Information 🔍`,
        thumbnail: {
            url: userAvatar
        },
        fields: messageContent,
        image: {
            url: getUrlEmoji(userPet.pet.mezon_emoji_id)
        },
        footer: {
            text: `📙 Ainz Mezon Bot • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    return embedMessage(embedConfig);
};

export const getBattleMessage = (user: User, battle: IBattle, image: string, footerMsg: string) => {
    const messagePayload: ChannelMessageContent = {
        embed: [
            {
                color: getRandomPastelHexColor(),
                title: `${user.username} is in a battle!`,
                thumbnail: { url: user.avatar },
                fields: [
                    {
                        name: `${battle.teamAName}`,
                        value: `Lv. ${battle.teamA[1].info.level} - ${battle.teamA[1].info.petName}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamA[3].info.level} - ${battle.teamA[3].info.petName}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamA[5].info.level} - ${battle.teamA[5].info.petName}`,
                        inline: true
                    },
                    {
                        name: `${battle.teamBName}`,
                        value: `Lv. ${battle.teamB[2].info.level} - ${battle.teamB[2].info.petName}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamB[4].info.level} - ${battle.teamB[4].info.petName}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamB[6].info.level} - ${battle.teamB[6].info.petName}`,
                        inline: true
                    }
                ],
                image: { url: image },
                footer: {
                    text: footerMsg
                }
            }
        ]
    };

    return messagePayload;
};
