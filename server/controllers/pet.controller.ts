import { emojisMessage, huntPet, textMessage } from '@/utils';
import { getPets, getRarities } from '@/services';

import { EmojiOnMessage } from 'mezon-sdk';
import { LIMIT_PET_PER_HUNT } from '@/constants/Constant';

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
