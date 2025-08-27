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
