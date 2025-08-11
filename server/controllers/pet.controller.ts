import { emojisMessage, textMessage } from '@/utils/message.util';

import { EmojiOnMessage } from 'mezon-sdk';
import { HuntPet } from '@/utils/hunt.util';
import { LIMIT_PET_PER_HUNT } from '@/constants/Constant';
import { getPets } from '@/services/pet.service';
import { getRarities } from '@/services/rarity.service';

export const huntPetController = async () => {
    try {
        const rarities = await getRarities();
        const pets = await getPets();
        let yourPets: EmojiOnMessage[] = [];

        for (let i = 0; i < LIMIT_PET_PER_HUNT; i++) {
            const pet = await HuntPet(rarities, pets);
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
