import { LIMIT_PET_PER_HUNT, USE_DAILY_ACTIVITY } from '@/constants/Constant';
import {
    createUserDailyActivity,
    createUserPets,
    getPets,
    getRarities,
    getTodayUserDailyActivity,
    getUser,
    updateUser,
    updateUserDailyActivity
} from '@/services';
import { emojisMessage, huntCheck, huntPet, textMessage } from '@/utils';

import { Pet } from '@prisma/client';
import { prisma } from '@/lib/db';

export const huntPetController = async (mezon_id: string) => {
    try {
        console.log('Hunting pet...');
        const user = await getUser(mezon_id);

        if (!user) {
            return textMessage('User not found!');
        }

        const todayActivity = await getTodayUserDailyActivity(user.id);

        if (todayActivity) {
            const huntPriority = huntCheck(user, todayActivity);
            console.log('Hunt priority:', huntPriority);
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[4]) {
                return textMessage(
                    'Bạn đã dùng lượt hunt miễn phí của ngày hôm nay và bạn không đủ Z Coin để hunt! Hãy thử lại vào ngày mai!'
                );
            }
            const rarities = await getRarities();
            const pets = await getPets();
            let yourPets: Pet[] = [];

            for (let i = 0; i < LIMIT_PET_PER_HUNT; i++) {
                const pet = await huntPet(rarities, pets);
                if (pet) {
                    yourPets.push(pet);
                } else {
                    return textMessage('Have error when hunting pet!');
                }
            }

            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[1]) {
                try {
                    console.log('user_id', user.id);
                    await prisma.$transaction(async (tx) => {
                        await createUserDailyActivity(tx, {
                            user: {
                                connect: {
                                    id: user.id
                                }
                            },
                            daily: 0,
                            hunt: 1
                        });

                        await createUserPets(
                            tx,
                            yourPets.map((pet) => ({
                                user_id: user.id,
                                pet_id: pet.id,
                                nickname: pet.name
                            }))
                        );
                    });

                    return emojisMessage(
                        yourPets.map((pet) => ({
                            emojiid: pet.mezon_emoji_id
                        }))
                    );
                } catch (error) {
                    console.log('Error hunting pet:', error);
                    return textMessage('Error when hunting pet!');
                }
            }
            if (
                huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[2] &&
                todayActivity
            ) {
                try {
                    await prisma.$transaction(async (tx) => {
                        await updateUserDailyActivity(
                            tx,
                            {
                                id: todayActivity.id
                            },
                            {
                                daily: 0,
                                hunt: 1
                            }
                        );

                        await createUserPets(
                            tx,
                            yourPets.map((pet) => ({
                                user_id: user.id,
                                pet_id: pet.id,
                                nickname: pet.name
                            }))
                        );
                    });

                    return emojisMessage(
                        yourPets.map((pet) => ({
                            emojiid: pet.mezon_emoji_id
                        }))
                    );
                } catch (error) {
                    console.log('Error hunting pet:', error);
                    return textMessage('Error when hunting pet!');
                }
            }
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[3]) {
                try {
                    await prisma.$transaction(async (tx) => {
                        await updateUser(
                            tx,
                            {
                                id: user.id
                            },
                            {
                                z_coin: {
                                    decrement:
                                        USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN
                                }
                            }
                        );

                        await createUserPets(
                            tx,
                            yourPets.map((pet) => ({
                                user_id: user.id,
                                pet_id: pet.id,
                                nickname: pet.name
                            }))
                        );
                    });

                    return emojisMessage(
                        yourPets.map((pet) => ({
                            emojiid: pet.mezon_emoji_id
                        }))
                    );
                } catch (error) {
                    console.log('Error hunting pet:', error);
                    return textMessage('Error when hunting pet!');
                }
            }
        }

        return textMessage('Hunt pet failed!');
    } catch (error) {
        console.log('Error hunting pet:', error);
        return textMessage('Internal server error');
    }
};
