import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message';
import {
    textMessage,
    myLeaderBoard,
    levelLeaderBoard,
    combatPowerLeaderBoard,
    winsLeaderBoard,
    lossesLeaderBoard
} from '@/utils';
import {
    getCombatPowerLeaderBoard,
    getLevelLeaderBoard,
    getLossesLeaderBoard,
    getMyLeaderBoard,
    getUserRank,
    getWinsLeaderBoard
} from '@/services';
import { IMyLeaderBoard } from '@/constants';

export const leaderBoardController = async (
    message: Message,
    channel: any,
    sender_id: string,
    targetRaw?: string | null
) => {
    let messageFetch: any;
    try {
        const messageReply = await message.reply(textMessage('🔍 Searching for Leader Board...'));
        messageFetch = await channel.messages.fetch(messageReply.message_id);

        if (targetRaw) {
            let leaderBoardPayload;
            switch (targetRaw) {
                case 'lv':
                    const topLevels = await getLevelLeaderBoard();
                    if (topLevels.length === 0) {
                        await messageFetch.update(textMessage('❌ No data in Leader Board!'));
                        return;
                    }
                    leaderBoardPayload = await levelLeaderBoard(topLevels);
                    break;
                case 'cp':
                    const topCP = await getCombatPowerLeaderBoard();
                    if (topCP.length === 0) {
                        await messageFetch.update(textMessage('❌ No data in Leader Board!'));
                        return;
                    }
                    leaderBoardPayload = await combatPowerLeaderBoard(topCP);
                    break;
                case 'wins':
                    const topWins = await getWinsLeaderBoard();

                    if (topWins.length === 0) {
                        await messageFetch.update(textMessage('❌ No data in Leader Board!'));
                        return;
                    }
                    leaderBoardPayload = await winsLeaderBoard(topWins);
                    break;
                case 'losses':
                    const topLosses = await getLossesLeaderBoard();

                    if (topLosses.length === 0) {
                        await messageFetch.update(textMessage('❌ No data in Leader Board!'));
                        return;
                    }
                    leaderBoardPayload = await lossesLeaderBoard(topLosses);
                    break;
                default:
                    await messageFetch.update(textMessage('❌ Invalid leaderboard type!'));
                    return;
            }
            await messageFetch.update(leaderBoardPayload);
            return;
        } else {
            const myLBData = await getMyLeaderBoard(sender_id);

            if (!myLBData) {
                await messageFetch.update(textMessage("❌ You don't have any data in Leader Board!"));
                return;
            }

            const [levelRank, cpRank, winsRank, lossesRank] = await Promise.all([
                getUserRank(sender_id, 'level'),
                getUserRank(sender_id, 'combat_power'),
                getUserRank(sender_id, 'wins'),
                getUserRank(sender_id, 'losses')
            ]);
            const myData: IMyLeaderBoard = {
                user: myLBData.user,
                level: {
                    rank: levelRank || 0,
                    value: myLBData.level
                },
                cp: {
                    rank: cpRank || 0,
                    value: myLBData.combat_power
                },
                wins: {
                    rank: winsRank || 0,
                    value: myLBData.wins
                },
                losses: {
                    rank: lossesRank || 0,
                    value: myLBData.losses
                }
            };
            await messageFetch.update(myLeaderBoard(myData));
            return;
        }
    } catch (error) {
        console.error('Error getting Leader Board:', error);
        if (messageFetch) {
            await messageFetch.update(textMessage('❌ Internal server error'));
        } else {
            await message.reply(textMessage('❌ Internal server error'));
        }
        return;
    }
};
