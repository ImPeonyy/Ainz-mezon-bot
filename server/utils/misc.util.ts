import { ERarityColor, ParsedAction } from '@/constants';

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
    if (!content) return { error: '🚨 Missing pet name and nickname!\nUsage: *ainz rename "Pet Name" > "Nickname"' };

    if (!content.includes('>') || content.trim().startsWith('>') || content.trim().endsWith('>'))
        return {
            error: '🚨 Must use ">" to separate pet name and nickname!\nUsage: *ainz rename "Pet Name" > "Nickname"'
        };

    const parts = content.split('>').map((p) => p.trim());

    if (parts.length !== 2) {
        return { error: '🚨 Wrong format!\nUsage: *ainz rename "Pet Name" > "Nickname"' };
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
    return Math.round(100 * level ** 1.5);
};

export const petLevelUp = (currentExp: number, currentLevel: number) => {
    return currentExp >= expToPetLevel(currentLevel + 1);
};

// export const getRandomHexColor = () => {
//     return `#${Math.floor(Math.random() * 0xffffff)
//         .toString(16)
//         .padStart(6, '0')}`;
// };

export const getRandomPastelHexColor = () => {
    const hue = Math.floor(Math.random() * 360); // 0–360 độ
    const saturation = 70; // %
    const lightness = 80;  // %
  
    return hslToHex(hue, saturation, lightness);
  };
  
  // Helper: chuyển HSL → HEX
  function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
  
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  
    return `#${[f(0), f(8), f(4)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")}`;
  }

  export const formatSecondsToMinutes = (seconds: number) => {
    return `${Math.floor(seconds / 60)} Minutes and ${seconds % 60} Seconds`;
  };