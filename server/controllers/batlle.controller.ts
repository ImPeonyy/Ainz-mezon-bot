import { getRandomUserPets } from '@/services/userPet.service';
import { prisma } from '@/lib/db';
import {
    userLevelUp,
    petLevelUp,
    processTeam,
    processTurn,
    textMessage,
    getBattleMessage,
    createBattleImage
} from '@/utils';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { IBattle, IBPet } from '@/constants/Type';
import { CLOUDINARY_BATTLE_FOLDER } from '@/constants/Constant';
import { uploadImageToCloudinary, deleteImagesFromCloudinary, getUser, updateUser, updateUserPet } from '@/services';
import { User } from '@prisma/client';
import { getRandomTeamForBattle, getTeamForBattle } from '@/services/team.service';

export const battleController = async (currentUser: User, targetId: string, channel: any, message: Message) => {
    let messageFetch: any;
    try {
        const battleMessage = await message.reply(textMessage('🛠️ Setup for battle...'));
        messageFetch = await channel.messages.fetch(battleMessage.message_id);

        const currentUserTeam = await getTeamForBattle(currentUser.id);

        if (!currentUserTeam) {
            await messageFetch.update(
                textMessage(
                    '🚨 You don\'t have a team. \n→ Please create one first!\nUsage: *ainz team create "team name"'
                )
            );
            return;
        }

        if (currentUserTeam.members.length !== 3) {
            await messageFetch.update(
                textMessage(
                    '🚨 Your team is not ready!\n→ Add 3 pets to your team first!\nUsage: *ainz team add 1 "pet name"'
                )
            );
            return;
        }

        await messageFetch.update(textMessage('🔍 Searching for a opponent...'));

        let targetTeam;

        if (targetId) {
            const user = await getUser(targetId);
            if (!user) {
                await messageFetch.update(textMessage('🚨 Target Opponent not found!\n→ Please try again later!'));
                return;
            }
            targetTeam = await getTeamForBattle(targetId);
            console.log(targetTeam);
            if (!targetTeam) {
                await messageFetch.update(textMessage('🚨 Target Opponent team not found!\n→ Please try again later!'));
                return;
            }
            if (targetTeam.members.length !== 3) {
                await messageFetch.update(textMessage('🙀 Oops! Your rival\'s team isn\'t ready yet.\nPlease search for another opponent!'));
                return;
            }
        } else {
            targetTeam = await getRandomTeamForBattle(currentUser.id);

            if (!targetTeam) {
                await messageFetch.update(textMessage('🚨 Random Opponent team not found!\n→ Please try again later!'));
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
            if (battle.turn % 6 === 0) {
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
                        ? `You lost in ${battle.turn} turns! You gained 50 exp and 50 exp for each of your pets!`
                        : `You won in ${battle.turn} turns! You gained 100 exp and 200 exp for each of your pets!`;
                await messageFetch.update(getBattleMessage(currentUser, battle, image.secure_url, msg));
            }
        }

        const result = {
            isOver: teamATurnQueue.length === 0 || teamBTurnQueue.length === 0,
            winner: teamATurnQueue.length === 0 ? 'Team B' : 'Team A',
            imageQueue: imageQueue
        };

        if (result.isOver) {
            deleteImagesFromCloudinary(imageQueue.slice(0, -1).map((image) => image.public_id));
            if (result.winner === 'Team A') {
                const isLevelUp = userLevelUp(currentUser.exp + 100, currentUser.level);
                try {
                    await prisma.$transaction(async (tx) => {
                        await updateUser(
                            tx,
                            {
                                id: currentUser.id
                            },
                            {
                                exp: {
                                    increment: 100
                                },
                                level: {
                                    increment: isLevelUp ? 1 : 0
                                }
                            }
                        );

                        await Promise.all(
                            processedTeamA.map((pet) => {
                                const isLevelUp = petLevelUp(pet.info.exp + 200, pet.info.level);
                                return updateUserPet(
                                    tx,
                                    { id: pet.id },
                                    { exp: { increment: 200 }, level: { increment: isLevelUp ? 1 : 0 } }
                                );
                            })
                        );
                    });
                } catch (error) {
                    console.log('Error updating user:', error);
                }
            } else {
                try {
                    await prisma.$transaction(async (tx) => {
                        const isLevelUp = userLevelUp(currentUser.exp + 50, currentUser.level);
                        await updateUser(
                            tx,
                            {
                                id: currentUser.id
                            },
                            {
                                exp: {
                                    increment: 50
                                },
                                level: {
                                    increment: isLevelUp ? 1 : 0
                                }
                            }
                        );

                        await Promise.all(
                            processedTeamA.map((pet) => {
                                const isLevelUp = petLevelUp(pet.info.exp + 50, pet.info.level);
                                return updateUserPet(
                                    tx,
                                    { id: pet.id },
                                    { exp: { increment: 50 }, level: { increment: isLevelUp ? 1 : 0 } }
                                );
                            })
                        );
                    });
                } catch (error) {
                    console.log('Error updating user:', error);
                }
            }
        }
    } catch (error) {
        console.log('Error in battleController:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
