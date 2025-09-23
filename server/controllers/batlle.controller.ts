import {
    CLOUDINARY_BATTLE_FOLDER,
    IBPet,
    IBattle,
    BATTLE,
    DEFAULT_RENDER_CYCLE,
    USE_DAILY_ACTIVITY,
    EChallengeStatus,
    BOT_ID
} from '@/constants';
import {
    createBattleImage,
    getBattleMessage,
    processTeam,
    processTurn,
    textMessage,
    formatSecondsToMinutes,
    calculateTeamCP,
    getChallengeMessage,
    getChallengeRequestMessage
} from '@/utils';
import {
    createUserDailyActivity,
    deleteImagesFromCloudinary,
    getRandomTeamForBattle,
    getTeamForBattle,
    getTodayUserDailyActivity,
    getUser,
    updateUser,
    updateUserDailyActivity,
    updateUserPet,
    uploadImageToCloudinary,
    upsertLeaderBoard,
    getTeamForCalcCP,
    updateTeamCombatPower,
    getUserWithTeam,
    deleteImageFromCloudinary
} from '@/services';

import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { Prisma, User } from '@prisma/client';
import { prisma } from '@/lib/db';
import { hasActiveBattleLog, hasActiveChallengeLog, logBattleWithExpire, logChallengeWithExpire, removeBattleLog, removeChallengeLog } from '@/redis';
import { MezonClient } from 'mezon-sdk';

export const battleController = async (currentUser: User, targetId: string, channel: any, message: Message) => {
    const renderCycle: number = parseInt(process.env.RENDER_CYCLE || DEFAULT_RENDER_CYCLE);
    let messageFetch: any;
    try {
        if (currentUser.id === targetId) {
            await message.reply(textMessage('🚨 You cannot battle yourself!'));
            return;
        }
        const battleMessage = await message.reply(textMessage('🛠️ Setup for battle...'));
        messageFetch = await channel.messages.fetch(battleMessage.message_id);

        const activeLog = await hasActiveBattleLog(currentUser);
        if (activeLog) {
            await messageFetch.update(
                textMessage(
                    `🚨 Your pet is currently resting.⏳ Please try again after ${formatSecondsToMinutes(activeLog)}!`
                )
            );
            return;
        }

        await logBattleWithExpire(currentUser);

        const todayActivity = await getTodayUserDailyActivity(currentUser.id);
        if (todayActivity && todayActivity.battle >= USE_DAILY_ACTIVITY.BATTLE.BATTLE_PER_DAY) {
            await messageFetch.update(
                textMessage(
                    `🚨 You’ve reached today’s battle limit (${todayActivity.battle}/${USE_DAILY_ACTIVITY.BATTLE.BATTLE_PER_DAY}). Please try again tomorrow!`
                )
            );
            await removeBattleLog(currentUser);
            return;
        }

        const currentUserTeam = await getTeamForBattle(currentUser.id);

        if (!currentUserTeam) {
            await messageFetch.update(
                textMessage("🚨 You don't have a team. \nPlz create one first!\n→ Usage: *ainz team create [team name]")
            );
            await removeBattleLog(currentUser);
            return;
        }

        if (currentUserTeam.members.length !== 3) {
            await messageFetch.update(
                textMessage(
                    '🚨 Your team is not ready!\nAdd 3 pets to your team first!\n→ Usage: *ainz team add [position] [pet name]'
                )
            );
            await removeBattleLog(currentUser);
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
                await removeBattleLog(currentUser);
                return;
            }
            targetTeam = await getTeamForBattle(targetId);

            if (!targetTeam) {
                await messageFetch.update(
                    textMessage('🚨 Target Opponent team not found!\nPlz search for another opponent!')
                );
                await removeBattleLog(currentUser);
                return;
            }
            if (targetTeam.members.length !== 3) {
                await messageFetch.update(
                    textMessage("🙀 Oops! Your rival's team isn't ready yet.\nPlz search for another opponent!")
                );
                await removeBattleLog(currentUser);
                return;
            }
        } else {
            targetTeam = await getRandomTeamForBattle(currentUser.id, currentUserTeam.combat_power);

            if (!targetTeam) {
                await messageFetch.update(textMessage('🚨 Random Opponent team not found!\nPlz try again later!'));
                await removeBattleLog(currentUser);
                return;
            }
        }

        const processedTeamA: IBPet[] = processTeam(currentUserTeam.members, 1);
        const processedTeamB: IBPet[] = processTeam(targetTeam.members, 2);

        let teamATurnQueue: number[] = [1, 3, 5];
        let teamBTurnQueue: number[] = [2, 4, 6];
        const imageQueue: { public_id: string; secure_url: string }[] = [];

        const battle: IBattle = {
            turn: 0,
            teamAName: currentUserTeam.name,
            teamBName: targetTeam.name,
            teamACP: currentUserTeam.combat_power,
            teamBCP: targetTeam.combat_power,
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
                    [battle.teamB[2], battle.teamB[4], battle.teamB[6]],
                    [battle.teamAName, battle.teamBName],
                    [battle.teamACP, battle.teamBCP]
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
                    [battle.teamB[2], battle.teamB[4], battle.teamB[6]],
                    [battle.teamAName, battle.teamBName],
                    [battle.teamACP, battle.teamBCP]
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
                    [battle.teamB[2], battle.teamB[4], battle.teamB[6]],
                    [battle.teamAName, battle.teamBName],
                    [battle.teamACP, battle.teamBCP]
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
            if (todayActivity) {
                await updateUserDailyActivity(
                    prisma,
                    {
                        id: todayActivity.id
                    },
                    {
                        battle: {
                            increment: 1
                        }
                    }
                );
            } else {
                await createUserDailyActivity(prisma, {
                    user: {
                        connect: {
                            id: currentUser.id
                        }
                    },
                    battle: 1
                });
            }
            if (result.winner === 'Team A') {
                try {
                    await prisma.$transaction(async (tx) => {
                        await updateUser(
                            tx,
                            {
                                id: currentUser.id
                            },
                            {
                                exp: {
                                    increment: BATTLE.USER.WIN_EXP
                                }
                            }
                        );

                        await Promise.all(
                            processedTeamA.map((pet) => {
                                return updateUserPet(
                                    tx,
                                    { id: pet.id },
                                    {
                                        exp: { increment: BATTLE.PET.WIN_EXP }
                                    }
                                );
                            })
                        );

                        await upsertLeaderBoard(tx, currentUser, true);
                    });
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            } else {
                try {
                    await prisma.$transaction(async (tx) => {
                        await updateUser(
                            tx,
                            {
                                id: currentUser.id
                            },
                            {
                                exp: {
                                    increment: BATTLE.USER.LOSE_EXP
                                }
                            }
                        );

                        await Promise.all(
                            processedTeamA.map((pet) => {
                                return updateUserPet(
                                    tx,
                                    { id: pet.id },
                                    {
                                        exp: { increment: BATTLE.PET.LOSE_EXP }
                                    }
                                );
                            })
                        );

                        await upsertLeaderBoard(tx, currentUser, false);
                    });
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            }
            const currentTeam = await getTeamForCalcCP(currentUser.id);
            if (currentTeam) {
                await updateTeamCombatPower(prisma, currentTeam.id, calculateTeamCP(currentTeam));
            }
        }
    } catch (error) {
        await removeBattleLog(currentUser);
        console.error('Error in battleController:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const challengeController = async (
    challenger: Prisma.UserGetPayload<{ include: { team: true } }>,
    opponent: Prisma.UserGetPayload<{ include: { team: true } }>,
    bet: number,
    channel: any,
    message: Message,
    client: MezonClient
) => {
    const renderCycle: number = 6;
    let messageFetch: any;
    try {
        const challengeMessage = await message.reply(textMessage('🛠️ Setup for challenge...'));
        messageFetch = await channel.messages.fetch(challengeMessage.message_id);

        const activeLog = await hasActiveChallengeLog(challenger);
        if (activeLog) {
            await messageFetch.update(
                textMessage(`🚨 Your are currently in a challenge! Plz wait for the challenge to end!`)
            );
            return;
        }

        await logChallengeWithExpire(challenger);

        const challengerTeam = await getTeamForBattle(challenger.id);

        if (!challengerTeam) {
            await messageFetch.update(
                textMessage("🚨 You don't have a team. \nPlz create one first!\n→ Usage: *ainz team create [team name]")
            );
            await removeChallengeLog(challenger);
            return;
        }

        if (challengerTeam.members.length !== 3) {
            await messageFetch.update(
                textMessage(
                    '🚨 Your team is not ready!\nAdd 3 pets to your team first!\n→ Usage: *ainz team add [position] [pet name]'
                )
            );
            await removeChallengeLog(challenger);
            return;
        }

        await messageFetch.update(textMessage('🔍 Searching for a opponent...'));

        let opponentTeam;

        opponentTeam = await getTeamForBattle(opponent.id);

        if (!opponentTeam) {
            await messageFetch.update(
                textMessage('🚨 Target Opponent team not found!\nPlz search for another opponent!')
            );
            await removeChallengeLog(challenger);
            return;
        }
        if (opponentTeam.members.length !== 3) {
            await messageFetch.update(
                textMessage("🙀 Oops! Your rival's team isn't ready yet.\nPlz search for another opponent!")
            );
            await removeChallengeLog(challenger);
            return;
        }

        const processedTeamA: IBPet[] = processTeam(challengerTeam.members, 1);
        const processedTeamB: IBPet[] = processTeam(opponentTeam.members, 2);

        let teamATurnQueue: number[] = [1, 3, 5];
        let teamBTurnQueue: number[] = [2, 4, 6];
        const imageQueue: { public_id: string; secure_url: string }[] = [];

        const battle: IBattle = {
            turn: 0,
            teamAName: challengerTeam.name,
            teamBName: opponentTeam.name,
            teamACP: challengerTeam.combat_power,
            teamBCP: opponentTeam.combat_power,
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

        const imageBuffer = await createBattleImage(
            [battle.teamA[1], battle.teamA[3], battle.teamA[5]],
            [battle.teamB[2], battle.teamB[4], battle.teamB[6]],
            [battle.teamAName, battle.teamBName],
            [battle.teamACP, battle.teamBCP]
        );
        const challengePreview = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);

        await messageFetch.update(getChallengeRequestMessage(challenger, opponent, challengePreview.secure_url, bet));

        const challengeStatus = await new Promise((resolve) => {
            const timeout = setTimeout(() => {
                resolve(EChallengeStatus.EXPIRED);
            }, 60000);

            client.onMessageButtonClicked((event: any) => {
                const { sender_id, user_id, button_id } = event;
                if (sender_id === BOT_ID && user_id === opponent.id) {
                    clearTimeout(timeout);
                    resolve(button_id);
                }
            });
        });
        await deleteImageFromCloudinary(challengePreview.public_id);
        if (challengeStatus === EChallengeStatus.EXPIRED) {
            await messageFetch.update(textMessage('⏱️ Challenge expired! No response received. Plz try again!'));
            await removeChallengeLog(challenger);
            return;
        }
        if (challengeStatus === EChallengeStatus.REJECTED) {
            await messageFetch.update(
                textMessage(`🚨 "${opponent.username}" has rejected the challenge from "${challenger.username}"!`)
            );
            await removeChallengeLog(challenger);
            return;
        }
        if (challengeStatus === EChallengeStatus.ACCEPTED) {
            await messageFetch.update(textMessage('🔍 Starting challenge...'));
            while (teamATurnQueue.length > 0 && teamBTurnQueue.length > 0) {
                if (battle.turn === 0) {
                    const imageBuffer = await createBattleImage(
                        [battle.teamA[1], battle.teamA[3], battle.teamA[5]],
                        [battle.teamB[2], battle.teamB[4], battle.teamB[6]],
                        [battle.teamAName, battle.teamBName],
                        [battle.teamACP, battle.teamBCP]
                    );
                    const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                    imageQueue.push(image);
                    await messageFetch.update(
                        getChallengeMessage(challenger, opponent, bet, battle, image.secure_url, `Battle start!`)
                    );
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
                        [battle.teamB[2], battle.teamB[4], battle.teamB[6]],
                        [battle.teamAName, battle.teamBName],
                        [battle.teamACP, battle.teamBCP]
                    );
                    const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                    imageQueue.push(image);
                    await messageFetch.update(
                        getChallengeMessage(
                            challenger,
                            opponent,
                            bet,
                            battle,
                            image.secure_url,
                            `Battle in progress! - Turn ${battle.turn}`
                        )
                    );
                }
                if (teamATurnQueue.length === 0 || teamBTurnQueue.length === 0) {
                    const imageBuffer = await createBattleImage(
                        [battle.teamA[1], battle.teamA[3], battle.teamA[5]],
                        [battle.teamB[2], battle.teamB[4], battle.teamB[6]],
                        [battle.teamAName, battle.teamBName],
                        [battle.teamACP, battle.teamBCP]
                    );
                    const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                    imageQueue.push(image);
                    const msg =
                        teamATurnQueue.length === 0
                            ? `🎉 "${opponent.username}" has defeated "${challenger.username}" in ${battle.turn} turns!\n🏆 "${opponent.username}" gained ${bet}₫ 💰`
                            : `🎉 "${challenger.username}" has defeated "${opponent.username}" in ${battle.turn} turns!\n🏆 "${challenger.username}" gained ${bet}₫ 💰`;
                    await messageFetch.update(
                        getChallengeMessage(challenger, opponent, bet, battle, image.secure_url, msg)
                    );
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

                let winner;
                let loser;

                if (result.winner === 'Team A') {
                    winner = challenger;
                    loser = opponent;
                } else {
                    winner = opponent;
                    loser = challenger;
                }

                await prisma.$transaction(async (tx) => {
                    await updateUser(
                        tx,
                        {
                            id: winner.id
                        },
                        {
                            exp: {
                                increment: BATTLE.USER.WIN_EXP
                            }
                        }
                    );

                    await updateUser(
                        tx,
                        {
                            id: loser.id
                        },
                        {
                            exp: {
                                increment: BATTLE.USER.LOSE_EXP
                            }
                        }
                    );
                });

                await prisma.$transaction(async (tx) => {
                    await Promise.all(
                        processedTeamA.map((pet) => {
                            return updateUserPet(
                                tx,
                                { id: pet.id },
                                {
                                    exp: {
                                        increment: result.winner === 'Team A' ? BATTLE.PET.WIN_EXP : BATTLE.PET.LOSE_EXP
                                    }
                                }
                            );
                        })
                    );

                    await Promise.all(
                        processedTeamB.map((pet) => {
                            return updateUserPet(
                                tx,
                                { id: pet.id },
                                {
                                    exp: {
                                        increment: result.winner === 'Team B' ? BATTLE.PET.WIN_EXP : BATTLE.PET.LOSE_EXP
                                    }
                                }
                            );
                        })
                    );
                });

                await prisma.$transaction(async (tx) => {
                    await upsertLeaderBoard(tx, winner, true);
                    await upsertLeaderBoard(tx, loser, false);
                    await updateUser(tx, { id: winner.id }, { mezon_token: { increment: bet } });
                    await updateUser(tx, { id: loser.id }, { mezon_token: { decrement: bet } });
                });

                const winnerTeam = await getTeamForCalcCP(winner.id);
                const loserTeam = await getTeamForCalcCP(loser.id);

                if (winnerTeam && loserTeam) {
                    await prisma.$transaction(async (tx) => {
                        await updateTeamCombatPower(tx, winnerTeam.id, calculateTeamCP(winnerTeam));
                        await updateTeamCombatPower(tx, loserTeam.id, calculateTeamCP(loserTeam));
                    });
                }
                await removeChallengeLog(challenger);
            }
        }
    } catch (error) {
        await removeChallengeLog(challenger);
        console.error('Error in challengeController:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
