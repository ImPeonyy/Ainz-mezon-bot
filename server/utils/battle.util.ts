export const manaAfterDealDamage = (hpBefore: number, hpAfter: number) => {
    const lostHpPercent = (hpBefore - hpAfter) / hpBefore;

    switch (true) {
        case lostHpPercent > 0 && lostHpPercent < 0.25: {
            const manaPercent = 0.25;
            return manaPercent * lostHpPercent;
        }
        case lostHpPercent >= 0.25 && lostHpPercent < 0.5: {
            const manaPercent = 0.5;
            return manaPercent * lostHpPercent;
        }
        case lostHpPercent >= 0.5 && lostHpPercent < 0.8: {
            const manaPercent = 1;
            return manaPercent * lostHpPercent;
        }
        case lostHpPercent >= 0.8 && lostHpPercent < 1: {
            return 1;
        }
        default:
            return 0;
    }
};
