import { ERarityColor, ParsedAction } from '@/constants';
import { ERarity, Prisma } from '@prisma/client';

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

export const parseChallengeCommand = (content: string) => {
    const parts = content.trim().split(/\s+/);
    const bet = parseInt(parts[0], 10);
    const target = parts[1];
    return { bet: isValidNumber(bet) ? bet : null, target };
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

export const getUserLevelFromExp = (exp: number) => {
    return Math.floor(Math.sqrt(exp / 100));
};

export const expToPetLevel = (level: number) => {
    return Math.round(100 * level ** 1.5);
};

export const getPetLevelFromExp = (exp: number) => {
    return Math.floor((exp / 100) ** (2 / 3));
};

// export const getRandomHexColor = () => {
//     return `#${Math.floor(Math.random() * 0xffffff)
//         .toString(16)
//         .padStart(6, '0')}`;
// };

export const getRandomPastelHexColor = () => {
    const hue = Math.floor(Math.random() * 360); // 0–360 độ
    const saturation = 70; // %
    const lightness = 80; // %

    return hslToHex(hue, saturation, lightness);
};

// Helper: chuyển HSL → HEX
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));

    return `#${[f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

export const formatSecondsToMinutes = (seconds: number) => {
    return `${Math.floor(seconds / 60)} Minutes and ${seconds % 60} Seconds`;
};

export const getAdditionalStats = (statPerLevel: number, level: number) => {
    return statPerLevel * level;
};

export const geLBtNextUpdate = (hours: number[]) => {
    const now = new Date();
    const vnStr = now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    const vnNow = new Date(vnStr);
    const curHour = vnNow.getHours();

    let nextHour = hours.find((h) => h > curHour) ?? hours[0];

    const nextTime = new Date(vnNow);
    nextTime.setHours(nextHour, 0, 0, 0);
    if (nextHour <= curHour) nextTime.setDate(nextTime.getDate() + 1);

    const diffMs = nextTime.getTime() - vnNow.getTime();
    const totalMinutes = Math.floor(diffMs / 60000);

    const msg = `Next update is in ${Math.floor(totalMinutes / 60)} hours and ${totalMinutes % 60} minutes`;

    return msg;
};

export const isValidImageExtension = (filename: string): boolean => {
    return (
        filename.toLowerCase().endsWith('.png') ||
        filename.toLowerCase().endsWith('.jpg') ||
        filename.toLowerCase().endsWith('.jpeg')
    );
};

export const isValidNumber = (value: any): boolean => {
    return !isNaN(Number(value));
};

export const getRarePetForAnnouncement = (pets: Prisma.PetGetPayload<{ include: { rarity: true } }>[]) => {
    const rarities: ERarity[] = [ERarity.Epic, ERarity.Legendary, ERarity.Mythic, ERarity.Limited];
    const rarePet = pets.filter((pet) => rarities.includes(pet.rarity.type));
    return rarePet || [];
};
