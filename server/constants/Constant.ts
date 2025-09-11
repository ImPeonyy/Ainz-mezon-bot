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
    }
};

export const BATTLE = {
    MANA_PER_HIT: 15
};
export const FAV_COLOR = '#F3AAB5';
export const CLOUDINARY_BATTLE_FOLDER = 'Battle';
export const CLOUDINARY_PROFILE_FOLDER = 'Profile';
export const BATTLE_CARD_HEIGHT = 460;
export const BATTLE_CARD_WIDTH = 800;
export const PROFILE_CARD_BG = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1757043360/UserProfileBG_b2kkx7.jpg';
export const AINZ_THUMBNAIL = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1757571181/download_ygjzey.jpg';