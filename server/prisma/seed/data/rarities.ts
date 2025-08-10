import { ERarity } from '@/constants/Enum';

export type RaritySeed = {
    name: string;
    mezon_emoji_id: string;
    type?: ERarity | null;
    catch_rate: number;
};

export const raritySeedData: RaritySeed[] = [
    {
        name: 'Common',
        mezon_emoji_id: '7359939378409694674',
        type: ERarity.Common,
        catch_rate: 0.6
    },
    {
        name: 'Uncommon',
        mezon_emoji_id: '7359939419336614752',
        type: ERarity.Uncommon,
        catch_rate: 0.28
    },
    {
        name: 'Rare',
        mezon_emoji_id: '7359939472574394074',
        type: ERarity.Rare,
        catch_rate: 0.08
    },
    {
        name: 'Epic',
        mezon_emoji_id: '7359939510142173438',
        type: ERarity.Epic,
        catch_rate: 0.03
    },
    {
        name: 'Legendary',
        mezon_emoji_id: '7359939601354159134',
        type: ERarity.Legendary,
        catch_rate: 0.008
    },
    {
        name: 'Mythic',
        mezon_emoji_id: '7359939551621409047',
        type: ERarity.Mythic,
        catch_rate: 0.002
    },
    {
        name: 'Limited',
        mezon_emoji_id: '7359939845555570189',
        type: ERarity.Limited,
        catch_rate: 0
    }
];
