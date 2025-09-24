import { ERarity } from "@prisma/client";

export const LIMIT_PET_PER_HUNT = 5;

export const USE_DAILY_ACTIVITY = {
    DAILY: {
        DAILY_PER_DAY: 1,
        REWARD: {
            Z_COIN: {
                MIN: 400,
                MAX: 600
            },
            EXP: {
                MIN: 50,
                MAX: 150
            }
        }
    },
    HUNT: {
        HUNT_PER_DAY: 1,
        COST: {
            HUNT: {
                Z_COIN: 300
            }
        },
        PRIORITY: {
            1: 'Hunt with Create',
            2: 'Hunt with Update',
            3: 'Hunt with Z-Coin',
            4: "Can't hunt"
        }
    },
    BATTLE: {
        BATTLE_PER_DAY: 10
    }
};

export const BATTLE = {
    MANA_PER_HIT: 15,
    USER: {
        WIN_EXP: 100,
        LOSE_EXP: 50,
    },
    PET: {
        WIN_EXP: 200,
        LOSE_EXP: 50,
    }
};
export const FAV_COLOR = '#F3AAB5';
export const CLOUDINARY_BATTLE_FOLDER = 'Battle';
export const CLOUDINARY_CHALLENGE_FOLDER = 'Challenge';
export const CLOUDINARY_PROFILE_FOLDER = 'Profile';
export const BATTLE_CARD_HEIGHT = 460;
export const BATTLE_CARD_WIDTH = 800;
export const PROFILE_CARD_BG = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1757043360/UserProfileBG_b2kkx7.jpg';
export const AINZ_THUMBNAIL = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1757658432/Overlord-dance_nlr2dt.gif';
export const AINZ_DEFAULT_AVATAR = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1757571181/download_ygjzey.jpg';
export const DEFAULT_RENDER_CYCLE = '6';
export const DEFAULT_TTL = 300; // 5 minutes
export const UPDATE_LEADERBOARD_CRON_SCHEDULE = [8, 12, 17];

export const RANK = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    10: '🔟'
};

export const RARITY_CP_MULTIPLIERS: Record<ERarity, number> = {
    [ERarity.Common]: 1.0,
    [ERarity.Uncommon]: 1.2,
    [ERarity.Rare]: 1.5,
    [ERarity.Epic]: 2.0,
    [ERarity.Legendary]: 2.5,
    [ERarity.Mythic]: 3.0,
    [ERarity.Limited]: 3.5
};

export const MAX_TEAM_NAME_LENGTH = 31;
export const MAX_USER_NAME_LENGTH = 27;
export const BOT_ID = process.env.BOT_ID || '';
export const IGNORED_CHANNELS = [
    '1950103202913325056',
    '1969618936873881600'
];