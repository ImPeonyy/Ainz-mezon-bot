import { ERarityColor } from '@/constants/Enum';
import { ParsedAction } from '@/constants/Type';

export const extractFirstTokenWithAsterisk = (content: string): string | null => {
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

export const parseActionCommandTeam = (content: string): ParsedAction => {
    if (!content) return { action: null, targetRaw: null };

    const match = content.trim().match(/^(\S+)(?:\s+(.*))?$/);
    if (!match) return { action: null, targetRaw: null };

    const [, action, targetRaw = null] = match;
    return { action, targetRaw };
};

export const parseRenameCommand = (content: string) => {
    if (!content) return { error: 'Please enter the pet name and nickname!' };

    if (!content.includes('>') || content.trim().startsWith('>') || content.trim().endsWith('>'))
        return { error: 'Must use ">" to separate pet name and nickname!' };

    const parts = content.split('>').map((p) => p.trim());

    if (parts.length !== 2) {
        return { error: 'Wrong format! Eg. *ainz rename "pet name" > "nickname"' };
    }

    return {
        petName: parts[0],
        nickname: parts[1]
    };
};

export const getActorName = (display_name: string, clan_nick: string) => {
    if (clan_nick !== '') {
        return clan_nick;
    }

    return display_name;
};

export const getTargetFromMention = (content: string | null) => {
    if (!content) return null;

    if (content.startsWith('@')) {
        return content.slice(1);
    }

    return content;
};

export const getRarityColor = (rarity: string): string => {
    return ERarityColor[rarity.toUpperCase() as keyof typeof ERarityColor];
};

export const getUrlEmoji = (emojiId: string) => {
    return `https://cdn.mezon.ai/emojis/${emojiId}.webp`;
};

export const expToUserLevel = (level: number) => {
    return 100 * level ** 2;
};

export const userLevelUp = (currentExp: number, currentLevel: number) => {
    return currentExp >= expToUserLevel(currentLevel + 1);
};

export const expToPetLevel = (level: number) => {
    return 100 * level ** 1.5;
};

export const petLevelUp = (currentExp: number, currentLevel: number) => {
    return currentExp >= expToUserLevel(currentLevel + 1);
};
