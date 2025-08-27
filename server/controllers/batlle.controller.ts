import { getRandomUserPets } from '@/services/userPet.service';
import { prisma } from '@/lib/db';
import { battleSimulation, textMessage } from '@/utils';

export const battleController = async () => {
    try {
        console.log('Battle started!');
        const teamA = await getRandomUserPets(prisma);
        const teamB = await getRandomUserPets(prisma);

        const result = battleSimulation(teamA, teamB);
        if (result.isOver) {
            return textMessage(`Battle over! ${result.winner} wins!`);
        }
    } catch (error) {
        console.log('Error in battleController:', error);
        return textMessage('Internal server error');
    }
};
