import { getRandomUserPets } from '@/services/userPet.service';
import { prisma } from '@/lib/db';
import { embedMessage, processTeam, processTurn, textMessage } from '@/utils';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { IBattle, IBPet } from '@/constants/Type';
import { createBattleImage } from '@/utils/battleCanvas.util';
import { CLOUDINARY_BATTLE_FOLDER } from '@/constants/Constant';
import { uploadImageToCloudinary, deleteImagesFromCloudinary, getUser } from '@/services';

export const battleController = async (channel: any, message: Message) => {
    try {
        const battleMessage = await message.reply(textMessage('Searching for opponent...'));
        const messageFetch = await channel.messages.fetch(battleMessage.message_id);

        const currentUser = await getUser(message.sender_id);

        if (!currentUser) {
            return textMessage('User not found');
        }

        const teamA = await getRandomUserPets(prisma, currentUser?.id);
        const teamB = await getRandomUserPets(prisma, currentUser?.id);

        const processedTeamA: IBPet[] = processTeam(teamA, 1);
        const processedTeamB: IBPet[] = processTeam(teamB, 2);

        let teamATurnQueue: number[] = [1, 3, 5];
        let teamBTurnQueue: number[] = [2, 4, 6];
        const imageQueue: { public_id: string; secure_url: string }[] = [];

        const fight: IBattle = {
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

        while (teamATurnQueue.length > 0 && teamBTurnQueue.length > 0) {
            if (fight.turn === 0) {
                const imageBuffer = await createBattleImage(
                    [fight.teamA[1], fight.teamA[3], fight.teamA[5]],
                    [fight.teamB[2], fight.teamB[4], fight.teamB[6]]
                );
                const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                imageQueue.push(image);
                await messageFetch.update(
                    embedMessage({
                        color: '#f3aab5',
                        title: 'Battle started!',
                        image: { url: image.secure_url }
                    })
                );
            }
            fight.turn++;
            console.log('\n\n--------------------------');
            console.log('🔄 Turn', fight.turn);
            if (fight.turn % 2 !== 0) {
                processTurn(teamATurnQueue, fight.teamA, teamBTurnQueue, fight.teamB, [2, 4, 6]);
            } else {
                processTurn(teamBTurnQueue, fight.teamB, teamATurnQueue, fight.teamA, [1, 3, 5]);
            }
            console.log('teamATurnQueue', teamATurnQueue);
            console.log('teamBTurnQueue', teamBTurnQueue);
            if (fight.turn % 3 === 0) {
                const imageBuffer = await createBattleImage(
                    [fight.teamA[1], fight.teamA[3], fight.teamA[5]],
                    [fight.teamB[2], fight.teamB[4], fight.teamB[6]]
                );
                const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                imageQueue.push(image);
                await messageFetch.update(
                    embedMessage({
                        color: '#f3aab5',
                        title: 'Battle in progress!',
                        image: { url: image.secure_url }
                    })
                );
            }
            if (teamATurnQueue.length === 0 || teamBTurnQueue.length === 0) {
                const imageBuffer = await createBattleImage(
                    [fight.teamA[1], fight.teamA[3], fight.teamA[5]],
                    [fight.teamB[2], fight.teamB[4], fight.teamB[6]]
                );
                const image = await uploadImageToCloudinary(imageBuffer, CLOUDINARY_BATTLE_FOLDER);
                imageQueue.push(image);
                await messageFetch.update(
                    embedMessage({
                        color: '#f3aab5',
                        title: 'Battle over!',
                        image: { url: image.secure_url }
                    })
                );
            }
        }

        const result = {
            isOver: teamATurnQueue.length === 0 || teamBTurnQueue.length === 0,
            winner: teamATurnQueue.length === 0 ? 'Team B' : 'Team A',
            imageQueue: imageQueue
        };

        if (result.isOver) {
            deleteImagesFromCloudinary(imageQueue.slice(0, -1).map((image) => image.public_id));
        }
    } catch (error) {
        console.log('Error in battleController:', error);
        return textMessage('Internal server error');
    }
};
