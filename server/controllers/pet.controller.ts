import { emojisMessage, huntPet, textMessage } from '@/utils';
import { getPets, getRarities } from '@/services';

import { EmojiOnMessage } from 'mezon-sdk';
import { LIMIT_PET_PER_HUNT } from '@/constants/Constant';
import { getPetDetailMessage } from '@/utils/message.util';

export const huntPetController = async () => {
    try {
        const rarities = await getRarities();
        const pets = await getPets();
        let yourPets: EmojiOnMessage[] = [];

        for (let i = 0; i < LIMIT_PET_PER_HUNT; i++) {
            const pet = await huntPet(rarities, pets);
            if (pet) {
                yourPets.push({
                    emojiid: pet.mezon_emoji_id
                });
            }
        }
        return emojisMessage(yourPets);
    } catch (error) {
        console.log('Error hunting pet:', error);
        return textMessage('Internal server error');
    }
};

export const dexController = async (petName: string) => {
    try {
        const pet = await getPetDetailMessage(petName);
        return pet
    } catch (error) {
        console.log('Error getting pet:', error);
        return textMessage('Internal server error');
    }
};
