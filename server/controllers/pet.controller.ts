import { LIMIT_PET_PER_HUNT, USE_DAILY_ACTIVITY } from '@/constants';
import {
    createUserDailyActivity,
    getPetDetail,
    getPets,
    getRarities,
    getTodayUserDailyActivity,
    getUser,
    getUserPetByName,
    getUserPetDetail,
    updateUser,
    updateUserDailyActivity,
    updateUserPet,
    upsertUserPetCount
} from '@/services';
import {
    getDexMessage,
    getHuntMessage,
    getMyDexMessage,
    getRarePetForAnnouncement,
    huntCheck,
    textMessage
} from '@/utils';

import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { MezonClient } from 'mezon-sdk';
import { worldAnnouncementController } from './misc.controller';
import { huntLimitedMidAutumnEvent } from '@/events/mid-autumn-2025';

export const huntPetController = async (
    mezon_id: string,
    message: Message,
    channel: any,
    client: MezonClient,
    channel_id: string
) => {
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
        let yourPets: Prisma.PetGetPayload<{ include: { rarity: true } }>[] = [];
        for (let i = 0; i < LIMIT_PET_PER_HUNT; i++) {
            const pet = await huntLimitedMidAutumnEvent(rarities, pets, channel_id);
            if (pet) {
                yourPets.push(pet);
            } else {
                await messageFetch.update(textMessage('Have error when hunting pet!'));
                return;
            }
        }

        const rarePets = getRarePetForAnnouncement(yourPets);

        if (!todayActivity) {
            try {
                await prisma.$transaction(
                    async (tx) => {
                        await createUserDailyActivity(tx, {
                            user: {
                                connect: {
                                    id: user.id
                                }
                            },
                            hunt: 1
                        });

                        for (const pet of yourPets) {
                            await upsertUserPetCount(tx, user.id, pet);
                        }
                    },
                    {
                        timeout: 10000
                    }
                );

                await messageFetch.update(
                    getHuntMessage(
                        yourPets.map((pet) => ({
                            emojiid: pet.mezon_emoji_id
                        }))
                    )
                );
                if (rarePets.length > 0) {
                    await worldAnnouncementController(user, rarePets, client);
                }
                return;
            } catch (error) {
                console.error('Error hunting pet:', error);
                if (messageFetch) {
                    await messageFetch.update(textMessage('❌ Internal server error'));
                } else {
                    await message.reply(textMessage('❌ Internal server error'));
                }
                return;
            }
        } else {
            const huntPriority = huntCheck(user, todayActivity);
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[4]) {
                await messageFetch.update(
                    textMessage(
                        '🚨 You’ve already used today’s free hunt, and you don’t have enough Z Coins to hunt (300 Z Coins per hunt)!\n⏳ Come back and try again tomorrow!'
                    )
                );
                return;
            }
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[2] && todayActivity) {
                try {
                    await prisma.$transaction(
                        async (tx) => {
                            await updateUserDailyActivity(
                                tx,
                                {
                                    id: todayActivity.id
                                },
                                {
                                    hunt: 1
                                }
                            );

                            for (const pet of yourPets) {
                                await upsertUserPetCount(tx, user.id, pet);
                            }
                        },
                        {
                            timeout: 10000
                        }
                    );

                    await messageFetch.update(
                        getHuntMessage(
                            yourPets.map((pet) => ({
                                emojiid: pet.mezon_emoji_id
                            }))
                        )
                    );
                    if (rarePets.length > 0) {
                        await worldAnnouncementController(user, rarePets, client);
                    }
                    return;
                } catch (error) {
                    console.error('Error hunting pet:', error);
                    if (messageFetch) {
                        await messageFetch.update(textMessage('❌ Internal server error'));
                    } else {
                        await message.reply(textMessage('❌ Internal server error'));
                    }
                    return;
                }
            }
            if (huntPriority === USE_DAILY_ACTIVITY.HUNT.PRIORITY[3]) {
                try {
                    await prisma.$transaction(
                        async (tx) => {
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
                                await upsertUserPetCount(tx, user.id, pet);
                            }
                        },
                        {
                            timeout: 10000
                        }
                    );

                    await messageFetch.update(
                        getHuntMessage(
                            yourPets.map((pet) => ({
                                emojiid: pet.mezon_emoji_id
                            }))
                        )
                    );
                    if (rarePets.length > 0) {
                        await worldAnnouncementController(user, rarePets, client);
                    }
                    return;
                } catch (error) {
                    console.error('Error hunting pet:', error);
                    if (messageFetch) {
                        await messageFetch.update(textMessage('❌ Internal server error'));
                    } else {
                        await message.reply(textMessage('❌ Internal server error'));
                    }
                    return;
                }
            }
        }

        await messageFetch.update(textMessage('Hunt pet failed!'));
        return;
    } catch (error) {
        console.error('Error hunting pet:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const dexController = async (petName: string, message: Message, channel: any, sender_id: string) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Searching for pet...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const pet = await getPetDetail(petName);
        if (!pet) {
            await messageFetch.update(textMessage('Pet not found!'));
            return;
        }
        const dexMessagePayload = getDexMessage(pet);
        await messageFetch.update(dexMessagePayload);
    } catch (error) {
        console.error('Error dex pet:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};

export const myDexController = async (petName: string, userId: string, message: Message, channel: any) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Searching for pet...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const userPet = await getUserPetDetail(petName, userId);
        if (!userPet) {
            await messageFetch.update(textMessage(`You don't own this pet!`));
            return;
        }
        const myDexMessagePayload = getMyDexMessage(userPet, userPet.user?.avatar);
        await messageFetch.update(myDexMessagePayload);
    } catch (error) {
        console.error('Error getting user pet:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
export const renamePetController = async (
    petName: string,
    nickname: string,
    userId: string,
    message: Message,
    channel: any
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔄 Renaming your pet...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);
        const userPet = await getUserPetByName(prisma, userId, petName);
        if (!userPet) {
            await messageFetch.update(textMessage("You don't have this pet!"));
            return;
        }

        const updatedPet = await updateUserPet(prisma, { id: userPet.id }, { nickname });

        await messageFetch.update(
            textMessage(`Pet "${userPet.pet.name}" has been renamed to "${updatedPet.nickname}" successfully!`)
        );
    } catch (error) {
        console.error('Error renaming pet:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
