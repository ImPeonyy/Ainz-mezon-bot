import {
    BOT_ID,
    EAsyncMutexMsgType,
    EGachaCountType,
    EHuntMenuStatus,
    EInteractiveMessageType,
    LIMIT_PET_PER_HUNT,
    MAX_LENGTH,
    USE_DAILY_ACTIVITY
} from '@/constants';
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
    upserGachaCount,
    upsertUserPetCount
} from '@/services';
import {
    getDexMessage,
    getHuntMenuMessage,
    getHuntResultMessage,
    getMyDexMessage,
    getRarePetForAnnouncement,
    huntPet,
    textMessage
} from '@/utils';

import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import { Prisma, User, UserDailyActivities } from '@prisma/client';
import { prisma } from '@/lib/db';
import { MezonClient } from 'mezon-sdk';
import { worldAnnouncementController } from './misc.controller';
import { interactiveMsgManager, asyncMutexMsgManager } from '@/managers';

const huntMenu = interactiveMsgManager;

const processHunting = async (huntCount: number = 1) => {
    const rarities = await getRarities();
    const pets = await getPets();
    let yourPets: Prisma.PetGetPayload<{ include: { rarity: true } }>[] = [];
    let gachaCount = 0;

    for (let i = 0; i < LIMIT_PET_PER_HUNT * huntCount; i++) {
        const huntResult = await huntPet(rarities, pets);
        if (huntResult) {
            yourPets.push(huntResult);
            gachaCount++;
        } else {
            throw new Error('Have error when hunting pet!');
        }
    }
    return { yourPets, gachaCount };
};

const processAfterHunt = async (
    user: User,
    yourPets: Prisma.PetGetPayload<{ include: { rarity: true } }>[],
    huntCount: number,
    gachaCount: number,
    client: MezonClient
) => {
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
                            decrement: USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN * huntCount
                        }
                    }
                );

                for (const pet of yourPets) {
                    await upsertUserPetCount(tx, user.id, pet);
                }

                await upserGachaCount(tx, user.id, EGachaCountType.NORMAL, gachaCount);
            },
            {
                timeout: 30000
            }
        );

        const rarePets = getRarePetForAnnouncement(yourPets);
        if (rarePets.length > 0) {
            await worldAnnouncementController(user, rarePets, client);
        }
        return;
    } catch (error) {
        throw error;
    }
};

const processAfterFreeHunt = async (
    user: User,
    yourPets: Prisma.PetGetPayload<{ include: { rarity: true } }>[],
    userDailyActivity: UserDailyActivities | null,
    gachaCount: number,
    client: MezonClient
) => {
    try {
        await prisma.$transaction(
            async (tx) => {
                if (userDailyActivity && userDailyActivity.hunt === 0) {
                    await updateUserDailyActivity(
                        tx,
                        {
                            id: userDailyActivity.id
                        },
                        {
                            hunt: 1
                        }
                    );
                } else {
                    await createUserDailyActivity(tx, {
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        hunt: 1
                    });
                }

                for (const pet of yourPets) {
                    await upsertUserPetCount(tx, user.id, pet);
                }

                await upserGachaCount(tx, user.id, EGachaCountType.NORMAL, gachaCount);
            },
            {
                timeout: 10000
            }
        );

        const rarePets = getRarePetForAnnouncement(yourPets);
        if (rarePets.length > 0) {
            await worldAnnouncementController(user, rarePets, client);
        }
        return;
    } catch (error) {
        throw error;
    }
};

export const huntPetController = async (existingUser: User, message: Message, channel: any, client: MezonClient) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🎯 Hunting pets...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        const todayActivity = await getTodayUserDailyActivity(existingUser.id);
        const isFreeHunt = !todayActivity || todayActivity.hunt === 0;
        const maxHunt = Math.floor(existingUser.z_coin / USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN);
        await messageFetch.update(getHuntMenuMessage(existingUser, isFreeHunt, maxHunt));

        const expireTimer = setTimeout(
            () => {
                huntMenu.forceClose(
                    existingUser.id,
                    EInteractiveMessageType.HUNT,
                    '⏰ Hunt has expired and has been closed automatically!'
                );
            },
            5 * 60 * 1000
        );

        huntMenu.register({
            userId: existingUser.id,
            message: messageFetch,
            expireTimer,
            type: EInteractiveMessageType.HUNT
        });

        client.onMessageButtonClicked(async (event: any) => {
            try {
                const { sender_id, user_id, button_id } = event;
                if (
                    sender_id === BOT_ID &&
                    user_id === existingUser.id &&
                    messageFetch.id === event.message_id &&
                    huntMenu.has(existingUser.id, EInteractiveMessageType.HUNT)
                ) {
                    const userFetch = await getUser(existingUser.id);
                    if (!userFetch) {
                        await messageFetch.update(textMessage('❌ User not found!'));
                        return;
                    }
                    const todayActivity = await getTodayUserDailyActivity(userFetch.id);
                    const isFreeHunt = !todayActivity || todayActivity.hunt === 0;
                    const maxHunt = Math.floor(userFetch.z_coin / USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN);

                    if (
                        userFetch.z_coin < USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN &&
                        todayActivity &&
                        todayActivity.hunt === USE_DAILY_ACTIVITY.HUNT.HUNT_PER_DAY
                    ) {
                        huntMenu.forceClose(
                            userFetch.id,
                            EInteractiveMessageType.HUNT,
                            '🚨 You do not have enough Z Coins to hunt!'
                        );
                        return;
                    }

                    if (button_id === EHuntMenuStatus.CANCEL) {
                        huntMenu.forceClose(
                            userFetch.id,
                            EInteractiveMessageType.HUNT,
                            '🚨 Hunt menu has been canceled!'
                        );
                        return;
                    }
                    if (
                        button_id === EHuntMenuStatus.HUNT_X1 ||
                        button_id === EHuntMenuStatus.HUNT_X5 ||
                        button_id === EHuntMenuStatus.HUNT_X30 ||
                        button_id === EHuntMenuStatus.FREE_HUNT
                    ) {
                        if (asyncMutexMsgManager.isLocked({ userId: userFetch.id, type: EAsyncMutexMsgType.HUNT })) {
                            console.log('HUNT is locked');
                            return;
                        }

                        await asyncMutexMsgManager.runExclusive(
                            { userId: userFetch.id, type: EAsyncMutexMsgType.HUNT },
                            async () => {
                                if (button_id === EHuntMenuStatus.HUNT_X1) {
                                    await messageFetch.update(
                                        getHuntMenuMessage(userFetch, isFreeHunt, maxHunt, true, '🔄 Hunting pets...')
                                    );
                                    const huntResult = await processHunting(USE_DAILY_ACTIVITY.HUNT.HUNT_BREAKPOINT.x1);
                                    await processAfterHunt(
                                        userFetch,
                                        huntResult.yourPets,
                                        USE_DAILY_ACTIVITY.HUNT.HUNT_BREAKPOINT.x1,
                                        huntResult.gachaCount,
                                        client
                                    );
                                    const updatedUser = await getUser(userFetch.id);
                                    if (!updatedUser) {
                                        await messageFetch.update(textMessage('❌ User not found!'));
                                        return;
                                    }
                                    const maxHuntUpdated = Math.floor(
                                        updatedUser.z_coin / USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN
                                    );
                                    setTimeout(async () => {
                                        await messageFetch.update(
                                            getHuntMenuMessage(
                                                updatedUser,
                                                isFreeHunt,
                                                maxHuntUpdated,
                                                false,
                                                '✅ Hunt x1 completed!',
                                                getHuntResultMessage(huntResult.yourPets)
                                            )
                                        );
                                        return;
                                    }, 1000);
                                }
                                if (button_id === EHuntMenuStatus.HUNT_X5) {
                                    await messageFetch.update(
                                        getHuntMenuMessage(userFetch, isFreeHunt, maxHunt, true, '🔄 Hunting pets...')
                                    );
                                    const huntResult = await processHunting(USE_DAILY_ACTIVITY.HUNT.HUNT_BREAKPOINT.x5);
                                    await processAfterHunt(
                                        userFetch,
                                        huntResult.yourPets,
                                        USE_DAILY_ACTIVITY.HUNT.HUNT_BREAKPOINT.x5,
                                        huntResult.gachaCount,
                                        client
                                    );
                                    const updatedUser = await getUser(userFetch.id);
                                    if (!updatedUser) {
                                        await messageFetch.update(textMessage('❌ User not found!'));
                                        return;
                                    }
                                    const maxHuntUpdated = Math.floor(
                                        updatedUser.z_coin / USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN
                                    );
                                    setTimeout(async () => {
                                        await messageFetch.update(
                                            getHuntMenuMessage(
                                                updatedUser,
                                                isFreeHunt,
                                                maxHuntUpdated,
                                                false,
                                                '✅ Hunt x5 completed!',
                                                getHuntResultMessage(huntResult.yourPets)
                                            )
                                        );
                                        return;
                                    }, 1000);
                                }
                                if (button_id === EHuntMenuStatus.HUNT_X30) {
                                    await messageFetch.update(
                                        getHuntMenuMessage(userFetch, isFreeHunt, maxHunt, true, '🔄 Hunting pets...')
                                    );
                                    const huntResult = await processHunting(
                                        USE_DAILY_ACTIVITY.HUNT.HUNT_BREAKPOINT.x30
                                    );
                                    await processAfterHunt(
                                        userFetch,
                                        huntResult.yourPets,
                                        USE_DAILY_ACTIVITY.HUNT.HUNT_BREAKPOINT.x30,
                                        huntResult.gachaCount,
                                        client
                                    );
                                    const updatedUser = await getUser(userFetch.id);
                                    if (!updatedUser) {
                                        await messageFetch.update(textMessage('❌ User not found!'));
                                        return;
                                    }
                                    const maxHuntUpdated = Math.floor(
                                        updatedUser.z_coin / USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN
                                    );
                                    setTimeout(async () => {
                                        await messageFetch.update(
                                            getHuntMenuMessage(
                                                updatedUser,
                                                isFreeHunt,
                                                maxHuntUpdated,
                                                false,
                                                `✅ Hunt x30 completed!`,
                                                getHuntResultMessage(huntResult.yourPets)
                                            )
                                        );
                                        return;
                                    }, 1000);
                                }
                                if (button_id === EHuntMenuStatus.FREE_HUNT) {
                                    await messageFetch.update(
                                        getHuntMenuMessage(userFetch, isFreeHunt, maxHunt, true, '🔄 Hunting pets...')
                                    );
                                    const huntResult = await processHunting(USE_DAILY_ACTIVITY.HUNT.HUNT_BREAKPOINT.x1);
                                    await processAfterFreeHunt(
                                        userFetch,
                                        huntResult.yourPets,
                                        todayActivity,
                                        huntResult.gachaCount,
                                        client
                                    );
                                    const updatedUser = await getUser(userFetch.id);
                                    if (!updatedUser) {
                                        await messageFetch.update(textMessage('❌ User not found!'));
                                        return;
                                    }
                                    const updatedTodayActivity = await getTodayUserDailyActivity(updatedUser.id);
                                    const isFreeHuntUpdated = !updatedTodayActivity || updatedTodayActivity.hunt === 0;
                                    const maxHuntUpdated = Math.floor(
                                        updatedUser.z_coin / USE_DAILY_ACTIVITY.HUNT.COST.HUNT.Z_COIN
                                    );
                                    setTimeout(async () => {
                                        await messageFetch.update(
                                            getHuntMenuMessage(
                                                updatedUser,
                                                isFreeHuntUpdated,
                                                maxHuntUpdated,
                                                false,
                                                `✅ Hunt free completed!`,
                                                getHuntResultMessage(huntResult.yourPets)
                                            )
                                        );
                                        return;
                                    }, 1000);
                                }
                            }
                        );
                    }
                }
            } catch (error) {
                console.error('Error hunting pet:', error);
                huntMenu.forceClose(existingUser.id, EInteractiveMessageType.HUNT, '❌ Internal server error');
                return;
            }
        });
    } catch (error) {
        console.error('Error setup hunt menu:', error);
        huntMenu.forceClose(existingUser.id, EInteractiveMessageType.HUNT, '❌ Internal server error');
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
        if (nickname.length > MAX_LENGTH.PET_NICKNAME) {
            await messageFetch.update(
                textMessage(`🚨 Nickname is too long! Maximum ${MAX_LENGTH.PET_NICKNAME} characters allowed.`)
            );
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
