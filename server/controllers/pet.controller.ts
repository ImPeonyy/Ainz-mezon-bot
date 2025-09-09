import { LIMIT_PET_PER_HUNT, USE_DAILY_ACTIVITY } from '@/constants/Constant';
import {
    createUserDailyActivity,
    getPetDetail,
    getPets,
    getRarities,
    getTodayUserDailyActivity,
    getUser,
    updateUser,
    updateUserDailyActivity,
    upsertUserPetCount
} from '@/services';
import { getHuntMessage, getDexMessage, huntCheck, huntPet, textMessage } from '@/utils';

import { Pet } from '@prisma/client';
import { prisma } from '@/lib/db';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';

export const huntPetController = async (mezon_id: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🎯 Hunting pets...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const user = await getUser(mezon_id);

        if (!user) {
            await messageFetch.update(textMessage('User not found!'));
            return;
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
                await messageFetch.update(textMessage('Have error when hunting pet!'));
                return;
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

                    for (const pet of yourPets) {
                        await upsertUserPetCount(tx, user.id, pet.id);
                    }
                });

                await messageFetch.update(getHuntMessage(
                    yourPets.map((pet) => ({
                        emojiid: pet.mezon_emoji_id
                    }))
                ));
                return;
            } catch (error) {
                console.log('Error hunting pet:', error);
                await messageFetch.update(textMessage('Error when hunting pet!'));
                return;
            }
        } else {
            const huntPriority = huntCheck(user, todayActivity);
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[4]) {
                await messageFetch.update(textMessage(
                    '🚫 You’ve already used today’s free hunt, and you don’t have enough Z Coins to hunt!\n⏳ Come back and try again tomorrow!'
                ));
                return;
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

                        for (const pet of yourPets) {
                            await upsertUserPetCount(tx, user.id, pet.id);
                        }
                    });

                    await messageFetch.update(getHuntMessage(
                        yourPets.map((pet) => ({
                            emojiid: pet.mezon_emoji_id
                        }))
                    ));
                    return;
                } catch (error) {
                    console.log('Error hunting pet:', error);
                    await messageFetch.update(textMessage('Error when hunting pet!'));
                    return;
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

                        for (const pet of yourPets) {
                            await upsertUserPetCount(tx, user.id, pet.id);
                        }
                    });

                    await messageFetch.update(getHuntMessage(
                        yourPets.map((pet) => ({
                            emojiid: pet.mezon_emoji_id
                        }))
                    ));
                    return;
                } catch (error) {
                    console.log('Error hunting pet:', error);
                    await messageFetch.update(textMessage('Error when hunting pet!'));
                    return;
                }
            }
        }

        await messageFetch.update(textMessage('Hunt pet failed!'));
        return;
    } catch (error) {
        console.log('Error hunting pet:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
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
        return textMessage('❌ Internal server error');
    }
};
