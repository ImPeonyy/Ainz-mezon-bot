import { LIMIT_PET_PER_HUNT, USE_DAILY_ACTIVITY } from '@/constants/Constant';
import {
    createUserDailyActivity,
    createUserPets,
    getPetDetail,
    getPets,
    getRarities,
    getTodayUserDailyActivity,
    getUser,
    updateUser,
    updateUserDailyActivity
} from '@/services';
import { emojisMessage, huntCheck, huntPet, textMessage, getDexMessage } from '@/utils';
import { Pet } from '@prisma/client';
import { prisma } from '@/lib/db';

export const huntPetController = async (mezon_id: string) => {
    try {
        const user = await getUser(mezon_id);

        if (!user) {
            return textMessage('User not found!');
        }

        const todayActivity = await getTodayUserDailyActivity(user.id);
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

        if (!todayActivity) {
            try {
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
        } else {
            const huntPriority = huntCheck(user, todayActivity);
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[4]) {
                return textMessage(
                    '🚫 You’ve already used today’s free hunt, and you don’t have enough Z Coins to hunt!\n⏳ Come back and try again tomorrow!'
                );
            }
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[2] && todayActivity) {
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
                                    decrement: USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN
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

export const dexController = async (petName: string) => {
    try {
        const pet = await getPetDetail(petName);
        if (!pet) {
            return textMessage('Pet not found!');
        }
        const dexMessagePayload = getDexMessage(pet);
        return dexMessagePayload;
    } catch (error) {
        console.log('Error getting pet:', error);
        return textMessage('Internal server error');
    }
};
