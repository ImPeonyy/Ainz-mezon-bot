import { ERarityColor } from '@/constants/Enum';
import { ParsedAction } from '@/constants/Type';

export const extractFirstTokenWithAsterisk = (
    content: string
): string | null => {
    if (!content) return null;

    const match = content.match(/^\*\S+/);
    return match ? match[0] : null;
};

export const parseActionCommand = (content: string): ParsedAction => {
    if (!content) return { trigger: null, action: null, targetRaw: null };

    const match = content.trim().match(/^(\*\S+)\s+(\S+)(?:\s+(.*))?$/);
    if (!match) return { trigger: null, action: null, targetRaw: null };

    const [, trigger, action, targetRaw = null] = match;
    return { trigger, action, targetRaw };
};

export const getActorName = (display_name: string, clan_nick: string) => {
    if (clan_nick !== '') {
        return clan_nick;
    }

    return display_name;
};

export const getTargetFromMention = (content: string | null) => {
    if (!content) return null;

    const target = content.slice(1);

    return target;
};

export const getRarityColor = (rarity: string): string => {
    switch (rarity) {
        case 'Common':
            return ERarityColor.COMMON;
        case 'Uncommon':
            return ERarityColor.UNCOMMON;
        case 'Rare':
            return ERarityColor.RARE;
        case 'Epic':
            return ERarityColor.EPIC;
        case 'Legendary':
            return ERarityColor.LEGENDARY;
        case 'Mythic':
            return ERarityColor.MYTHIC;
        case 'Limited':
            return ERarityColor.LIMITED;
        default:
            return ERarityColor.COMMON; 
    }
};

export const getUrlEmoji = (emojiId: string) => {
    return `https://cdn.mezon.ai/emojis/${emojiId}.webp`;
};
