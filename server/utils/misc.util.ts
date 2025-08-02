import { ParsedAction } from '@/constants/Type';

export function extractFirstTokenWithAsterisk(content: string): string | null {
    if (!content) return null;

    const match = content.match(/^\*\S+/);
    return match ? match[0] : null;
}

export function parseActionCommand(content: string): ParsedAction {
    if (!content) return { trigger: null, action: null, targetRaw: null };

    const match = content.trim().match(/^(\*\S+)\s+(\S+)(?:\s+(.*))?$/);
    if (!match) return { trigger: null, action: null, targetRaw: null };

    const [, trigger, action, targetRaw = null] = match;
    return { trigger, action, targetRaw };
}
