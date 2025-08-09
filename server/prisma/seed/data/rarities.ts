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
        mezon_emoji_id: 'emoji_common',
        type: ERarity.Common,
        catch_rate: 0.6
    },
    {
        name: 'Uncommon',
        mezon_emoji_id: 'emoji_uncommon',
        type: ERarity.Uncommon,
        catch_rate: 0.28
    },
    {
        name: 'Rare',
        mezon_emoji_id: 'emoji_rare',
        type: ERarity.Rare,
        catch_rate: 0.08
    },
    {
        name: 'Epic',
        mezon_emoji_id: 'emoji_epic',
        type: ERarity.Epic,
        catch_rate: 0.03
    },
    {
        name: 'Legendary',
        mezon_emoji_id: 'emoji_legendary',
        type: ERarity.Legendary,
        catch_rate: 0.008
    },
    {
        name: 'Mythic',
        mezon_emoji_id: 'emoji_mythic',
        type: ERarity.Mythic,
        catch_rate: 0.002
    }
];
