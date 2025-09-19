import { CLOUDINARY_BATTLE_FOLDER, IBPet, IBattle, BATTLE, DEFAULT_RENDER_CYCLE } from '@/constants';
import {
    createBattleImage,
    getBattleMessage,
    petLevelUp,
    processTeam,
    processTurn,
    textMessage,
    userLevelUp,
    formatSecondsToMinutes
} from '@/utils';
import {
    deleteImagesFromCloudinary,
    getRandomTeamForBattle,
    getTeamForBattle,
    getUser,
    updateUser,
    updateUserPet,
    uploadImageToCloudinary
} from '@/services';

import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { User } from '@prisma/client';
import { prisma } from '@/lib/db';
import { hasActiveLog, logRedisWithExpire } from '@/redis';

export const battleController = async (currentUser: User, targetId: string, channel: any, message: Message) => {
    const renderCycle: number = parseInt(process.env.RENDER_CYCLE || DEFAULT_RENDER_CYCLE);
    let messageFetch: any;
    try {
        const battleMessage = await message.reply(textMessage('🛠️ Setup for battle...'));
        messageFetch = await channel.messages.fetch(battleMessage.message_id);

        const activeLog = await hasActiveLog(currentUser.id);
        if (activeLog) {
            await messageFetch.update(textMessage(`🚨 Your pet is currently resting. Please try again after ${formatSecondsToMinutes(activeLog)}!`));
            return;
        }

        const currentUserTeam = await getTeamForBattle(currentUser.id);

        if (!currentUserTeam) {
            await messageFetch.update(
                textMessage("🚨 You don't have a team. \nPlz create one first!\n→ Usage: *ainz team create [team name]")
            );
            return;
        }

        if (currentUserTeam.members.length !== 3) {
            await messageFetch.update(
                textMessage(
                    '🚨 Your team is not ready!\nAdd 3 pets to your team first!\n→ Usage: *ainz team add 1 [pet name]'
                )
            );
            return;
        }

        await messageFetch.update(textMessage('🔍 Searching for a opponent...'));

        let targetTeam;

        if (targetId) {
            const user = await getUser(targetId);
            if (!user) {
                await messageFetch.update(
                    textMessage('🚨 Target Opponent not found!\nPlz search for another opponent!')
                );
                return;
            }
            targetTeam = await getTeamForBattle(targetId);

            if (!targetTeam) {
                await messageFetch.update(
                    textMessage('🚨 Target Opponent team not found!\nPlz search for another opponent!')
                );
                return;
            }
            if (targetTeam.members.length !== 3) {
                await messageFetch.update(
                    textMessage("🙀 Oops! Your rival's team isn't ready yet.\nPlz search for another opponent!")
                );
                return;
            }
        } else {
            targetTeam = await getRandomTeamForBattle(currentUser.id);

            if (!targetTeam) {
                await messageFetch.update(textMessage('🚨 Random Opponent team not found!\nPlz try again later!'));
                return;
            }
        }

        await logRedisWithExpire(currentUser.id);

        const processedTeamA: IBPet[] = processTeam(currentUserTeam.members, 1);
        const processedTeamB: IBPet[] = processTeam(targetTeam.members, 2);

        let teamATurnQueue: number[] = [1, 3, 5];
        let teamBTurnQueue: number[] = [2, 4, 6];
        const imageQueue: { public_id: string; secure_url: string }[] = [];

        const battle: IBattle = {
            turn: 0,
            teamAName: currentUserTeam.name,
            teamBName: targetTeam.name,
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

        while (teamATurnQueue.length > 0 && teamBTurnQueue.length > 0) {
            if (battle.turn === 0) {
                const imageBuffer = await createBattleImage(
                    [battle.teamA[1], battle.teamA[3], battle.teamA[5]],
                    [battle.teamB[2], battle.teamB[4], battle.teamB[6]]
                );
                const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                imageQueue.push(image);
                await messageFetch.update(getBattleMessage(currentUser, battle, image.secure_url, `Battle start!`));
            }
            battle.turn++;
            if (battle.turn % 2 !== 0) {
                processTurn(teamATurnQueue, battle.teamA, teamBTurnQueue, battle.teamB, [2, 4, 6]);
            } else {
                processTurn(teamBTurnQueue, battle.teamB, teamATurnQueue, battle.teamA, [1, 3, 5]);
            }
            if (battle.turn % renderCycle === 0) {
                const imageBuffer = await createBattleImage(
                    [battle.teamA[1], battle.teamA[3], battle.teamA[5]],
                    [battle.teamB[2], battle.teamB[4], battle.teamB[6]]
                );
                const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                imageQueue.push(image);
                await messageFetch.update(
                    getBattleMessage(currentUser, battle, image.secure_url, `Battle in progress! - Turn ${battle.turn}`)
                );
            }
            if (teamATurnQueue.length === 0 || teamBTurnQueue.length === 0) {
                const imageBuffer = await createBattleImage(
                    [battle.teamA[1], battle.teamA[3], battle.teamA[5]],
                    [battle.teamB[2], battle.teamB[4], battle.teamB[6]]
                );
                const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                imageQueue.push(image);
                const msg =
                    teamATurnQueue.length === 0
                        ? `You LOST in ${battle.turn} turns! You gained ${BATTLE.USER.LOSE_EXP} exp and ${BATTLE.PET.LOSE_EXP} exp for each of your pets!`
                        : `You WON in ${battle.turn} turns! You gained ${BATTLE.USER.WIN_EXP} exp and ${BATTLE.PET.WIN_EXP} exp for each of your pets!`;
                await messageFetch.update(getBattleMessage(currentUser, battle, image.secure_url, msg));
            }
        }

        const result = {
            isOver: teamATurnQueue.length === 0 || teamBTurnQueue.length === 0,
            winner: teamATurnQueue.length === 0 ? 'Team B' : 'Team A',
            imageQueue: imageQueue
        };

        if (result.isOver) {
            try {
                await deleteImagesFromCloudinary(imageQueue.slice(0, -1).map((image) => image.public_id));
            } catch (err) {
                console.error('Error deleting images from Cloudinary:', err);
            }
            if (result.winner === 'Team A') {
                try {
                    const isLevelUp = userLevelUp(currentUser.exp + BATTLE.USER.WIN_EXP, currentUser.level);
                    await prisma.$transaction(async (tx) => {
                        await updateUser(
                            tx,
                            {
                                id: currentUser.id
                            },
                            {
                                exp: {
                                    increment: BATTLE.USER.WIN_EXP
                                },
                                level: {
                                    increment: isLevelUp ? 1 : 0
                                }
                            }
                        );

                        await Promise.all(
                            processedTeamA.map((pet) => {
                                const isLevelUp = petLevelUp(pet.info.exp + BATTLE.PET.WIN_EXP, pet.info.level);
                                return updateUserPet(
                                    tx,
                                    { id: pet.id },
                                    {
                                        exp: { increment: BATTLE.PET.WIN_EXP },
                                        ...(isLevelUp && {
                                            level: { increment: 1 },
                                            additional_hp: { increment: pet.stats.statsPerLevel.hp },
                                            additional_ad: { increment: pet.stats.statsPerLevel.ad },
                                            additional_ap: { increment: pet.stats.statsPerLevel.ap },
                                            additional_ar: { increment: pet.stats.statsPerLevel.ar },
                                            additional_mr: { increment: pet.stats.statsPerLevel.mr }
                                        })
                                    }
                                );
                            })
                        );
                    });
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            } else {
                try {
                    await prisma.$transaction(async (tx) => {
                        const isLevelUp = userLevelUp(currentUser.exp + BATTLE.USER.LOSE_EXP, currentUser.level);
                        await updateUser(
                            tx,
                            {
                                id: currentUser.id
                            },
                            {
                                exp: {
                                    increment: BATTLE.USER.LOSE_EXP
                                },
                                level: {
                                    increment: isLevelUp ? 1 : 0
                                }
                            }
                        );

                        await Promise.all(
                            processedTeamA.map((pet) => {
                                const isLevelUp = petLevelUp(pet.info.exp + BATTLE.PET.LOSE_EXP, pet.info.level);
                                return updateUserPet(
                                    tx,
                                    { id: pet.id },
                                    {
                                        exp: { increment: BATTLE.PET.LOSE_EXP },
                                        ...(isLevelUp && {
                                            level: { increment: 1 },
                                            additional_hp: { increment: pet.stats.statsPerLevel.hp },
                                            additional_ad: { increment: pet.stats.statsPerLevel.ad },
                                            additional_ap: { increment: pet.stats.statsPerLevel.ap },
                                            additional_ar: { increment: pet.stats.statsPerLevel.ar },
                                            additional_mr: { increment: pet.stats.statsPerLevel.mr }
                                        })
                                    }
                                );
                            })
                        );
                    });
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            }
        }
    } catch (error) {
        console.error('Error in battleController:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
