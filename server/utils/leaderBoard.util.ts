import { AINZ_THUMBNAIL, IMyLeaderBoard, RANK } from '@/constants';
import { getRandomPastelHexColor, embedMessage } from '@/utils';
import { Prisma } from '@prisma/client';

const getRank = (rank: number) => {
    if (rank < 10) {
        return RANK[rank];
    }
    return `⚪ #${rank}`;
};

export const myLeaderBoard = (myData: IMyLeaderBoard) => {
    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: `🏆 Rank of ${myData.user.username}`,
        thumbnail: { url: myData.user.avatar },
        fields: [
            { name: '📊 Level', value: `${getRank(myData.level.rank)} | Lv.${myData.level.value}`, inline: false },
            { name: '⚔️ Combat Power', value: `${getRank(myData.cp.rank)} | ${myData.cp.value} CP`, inline: false },
            { name: '✅ Wins', value: `${getRank(myData.wins.rank)} | ${myData.wins.value} Wins`, inline: false },
            { name: '❌ Losses', value: `${getRank(myData.losses.rank)} | ${myData.losses.value} Losses`, inline: false }
        ],
        footer: {
            text: `📙 Ainz Mezon Bot • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    return embedMessage(embedConfig);
};

export const levelLeaderBoard = (topLevels: Prisma.LeaderBoardGetPayload<{ include: { user: true } }>[]) => {
    const leaderboardText = topLevels
        .map((item, index) => {
            return `${RANK[index + 1]} Lv. ${item.level} - ${item.user.username}`;
        })
        .join('\n');

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: '🏆 Top Level Leaderboard',
        description: leaderboardText,
        thumbnail: { url: AINZ_THUMBNAIL },
        footer: {
            text: `📙 Ainz Mezon Bot • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    return embedMessage(embedConfig);
};

export const combatPowerLeaderBoard = (topCP: Prisma.LeaderBoardGetPayload<{ include: { user: true } }>[]) => {
    const leaderboardText = topCP
        .map((item, index) => {
            return `${RANK[index + 1]} ${item.combat_power.toLocaleString()} CP - ${item.user.username}`;
        })
        .join('\n');

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: '⚔️ Top Combat Power Leaderboard',
        description: leaderboardText,
        thumbnail: { url: AINZ_THUMBNAIL },
        footer: {
            text: `📙 Ainz Mezon Bot • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    return embedMessage(embedConfig);
};

export const winsLeaderBoard = (topWins: Prisma.LeaderBoardGetPayload<{ include: { user: true } }>[]) => {
    const leaderboardText = topWins
        .map((item, index) => {
            return `${RANK[index + 1]} ${item.wins} wins - ${item.user.username}`;
        })
        .join('\n');

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: '✅ Top Wins Leaderboard',
        description: leaderboardText,
        thumbnail: { url: AINZ_THUMBNAIL },
        footer: {
            text: `📙 Ainz Mezon Bot • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    return embedMessage(embedConfig);
};

export const lossesLeaderBoard = (topLosses: Prisma.LeaderBoardGetPayload<{ include: { user: true } }>[]) => {
    const leaderboardText = topLosses
        .map((item, index) => {
            return `${RANK[index + 1]} ${item.losses} losses - ${item.user.username}`;
        })
        .join('\n');

    const embedConfig = {
        color: getRandomPastelHexColor(),
        title: '❌ Top Losses Leaderboard',
        description: leaderboardText,
        thumbnail: { url: AINZ_THUMBNAIL },
        footer: {
            text: `📙 Ainz Mezon Bot • Last updated: ${new Date().toLocaleDateString('vi-VN')}`
        }
    };

    return embedMessage(embedConfig);
};
