import { ChannelMessageContent, EmojiOnMessage, IEmbedProps } from 'mezon-sdk';

import { ACTIONS } from '@/constants/Commands';
import { Prisma, Pet, User, ERarity } from '@prisma/client';
import { expToPetLevel, getRarityColor, getUrlEmoji } from '@/utils';
import { AINZ_THUMBNAIL, FAV_COLOR } from '@/constants/Constant';
import { IBattle } from '@/constants/Type';

export const textMessage = (message: string) => {
    const messagePayload: ChannelMessageContent = {
        t: message
    };

    return messagePayload;
};

export const embedMessage = (embed: IEmbedProps) => {
    const embedPayload: IEmbedProps = embed;
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

export const getBagMessage = (pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[], bag: Prisma.UserPetGetPayload<{ include: { pet: true } }>[]) => {
    let messagePayload: ChannelMessageContent = {
        t: '🎒 Current pets in your collection:\n',
        ej: []
    };

    const petCountMap = new Map<number, number>();
    bag.forEach(userPet => {
        const petId = userPet.pet.id;
        const count = userPet.count ?? 0;
        petCountMap.set(petId, (petCountMap.get(petId) || 0) + count);
    });

    const petsByRarity = pets.reduce((acc, pet) => {
        const rarity = pet.rarity?.name || 'Common';
        if (!acc[rarity]) {
            acc[rarity] = [];
        }
        acc[rarity].push(pet);
        return acc;
    }, {} as Record<string, Prisma.PetGetPayload<{ include: { rarity: true } }>[]>);

    const rarityOrder = Object.values(ERarity);
    
    rarityOrder.forEach(rarity => {
        if (petsByRarity[rarity] && petsByRarity[rarity].length > 0) {
            messagePayload.t += `**${rarity}:**\n`;
            
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
    bag.forEach(userPet => {
      const petId = userPet.pet.id;
      const count = userPet.count ?? 0;
      petCountMap.set(petId, (petCountMap.get(petId) || 0) + count);
    });
  
    const petsByRarity = pets.reduce((acc, pet) => {
      const rarity = pet.rarity?.name || 'Common';
      if (!acc[rarity]) {
        acc[rarity] = [];
      }
      acc[rarity].push(pet);
      return acc;
    }, {} as Record<string, Prisma.PetGetPayload<{ include: { rarity: true } }>[]>);
  
    const rarityOrder = Object.values(ERarity);
  
    rarityOrder.forEach(rarity => {
      if (petsByRarity[rarity] && petsByRarity[rarity].length > 0) {
        messagePayload.t += `\n**${rarity}:**\n`;
  
        petsByRarity[rarity].forEach(pet => {
          const count = petCountMap.get(pet.id) || 0;
          const countStr = count === 0 ? '       ' : `(${String(count).padStart(2, '0')})`;
  
          // gắn emoji mapping
          messagePayload.ej?.push({
            emojiid: pet.mezon_emoji_id,
            s: messagePayload.t?.length || 0,
            e: (messagePayload.t?.length || 0) + 1
          });
  
          // format mới: emoji (00) - Name
          messagePayload.t += ` ${countStr} - ${pet.name}\n`;
        });
      }
    });
  
    return messagePayload;
  };

export const teamInfoMessage = (pets: Prisma.TeamMemberGetPayload<{ include: { userPet: { include: { pet: true } } } }>[]) => {
    let messagePayload: ChannelMessageContent = {
        t: 'Your team contains the following pets:\n',
        ej: []
    };

    pets.forEach((pet) => {
        messagePayload.t += `Position ${pet.position}: `;
        messagePayload.ej?.push({
            emojiid: pet.userPet.pet.mezon_emoji_id,
            s: messagePayload.t?.length || 0,
            e: messagePayload.t?.length || 0 + 1
        });
        messagePayload.t += `${pet.userPet.pet.name} - Lv. ${pet.userPet.level} \n`;
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
            { name: '⭐ Rarity', value: statistic.rarity, inline: true },
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
    userPet: Prisma.UserPetGetPayload<{ include: { pet: { include: { statistic: true; rarity: true; autoAttack: true; passiveSkill: true; activeSkill: true } } } }>,
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

    if (statistic) {
        messageContent.push(
            { name: '🏷️ Nickname', value: userPet.nickname || userPet.pet.name, inline: true },
            { name: '🎖️ Level', value: userPet.level.toString() || '0', inline: true },
            { name: '✨ Exp', value: `${userPet.exp.toString() || '0'}/${expToPetLevel(userPet.level + 1 || 0)}`, inline: true },
            { name: '⭐ Rarity', value: statistic.rarity, inline: true },
            { name: '🎭 Role', value: statistic.role, inline: true },
            { name: '⚔️ Attack type', value: statistic.scaling_type, inline: true },
            { name: '❤️', value: (statistic.hp  + userPet.additional_hp).toString(), inline: true },
            { name: '🗡️', value: (statistic.ad  + userPet.additional_ad).toString(), inline: true },
            { name: '🛡️', value: (statistic.ar  + userPet.additional_ar).toString(), inline: true },
            { name: '💧', value: (statistic.mana  + userPet.additional_mana).toString(), inline: true },
            { name: '💫', value: (statistic.ap  + userPet.additional_ap).toString(), inline: true },
            { name: '⛊', value: (statistic.mr  + userPet.additional_mr).toString(), inline: true }
        );
    }

    const embedConfig: IEmbedProps = {
        color: getRarityColor(statistic.rarity),
        title: `${userPet.pet.name} Information 🔍`,
        thumbnail: {
            url:  userAvatar
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
                color: FAV_COLOR,
                title: `${user.username} is in a battle!`,
                thumbnail: { url: user.avatar },
                //     description: `Team A\n
                // Lv. ${battle.teamA[1].info.level} - ${battle.teamA[1].info.nickname}\n
                // Lv. ${battle.teamA[3].info.level} - ${battle.teamA[3].info.nickname}\n
                // Lv. ${battle.teamA[5].info.level} - ${battle.teamA[5].info.nickname}\n\n
                // Team B\n
                // Lv. ${battle.teamB[2].info.level} - ${battle.teamB[2].info.nickname}\n
                // Lv. ${battle.teamB[4].info.level} - ${battle.teamB[4].info.nickname}\n
                // Lv. ${battle.teamB[6].info.level} - ${battle.teamB[6].info.nickname}`,
                fields: [
                    {
                        name: 'Team A',
                        value: `Lv. ${battle.teamA[1].info.level} - ${battle.teamA[1].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamA[3].info.level} - ${battle.teamA[3].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamA[5].info.level} - ${battle.teamA[5].info.nickname}`,
                        inline: true
                    },
                    {
                        name: 'Team B',
                        value: `Lv. ${battle.teamB[2].info.level} - ${battle.teamB[2].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamB[4].info.level} - ${battle.teamB[4].info.nickname}`,
                        inline: true
                    },
                    {
                        name: '----------',
                        value: `Lv. ${battle.teamB[6].info.level} - ${battle.teamB[6].info.nickname}`,
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
