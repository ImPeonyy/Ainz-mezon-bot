import { redis } from '@/configs';

export async function logRedisWithExpire(userId: string, expireInSeconds: number = 5 * 60): Promise<void> {
    const key = `logs:${userId}:${Date.now()}`;
    await redis.set(key, '1', 'EX', expireInSeconds);
    console.log(`📝 Saved log for user ${userId} with TTL ${expireInSeconds}s`);
}

export async function getLogsByUser(userId: string): Promise<string[]> {
    const pattern = `logs:${userId}:*`;
    const keys: string[] = [];

    let cursor = '0';
    do {
        const [newCursor, foundKeys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = newCursor;
        keys.push(...foundKeys);
    } while (cursor !== '0');

    return keys;
}

export async function hasActiveLog(userId: string): Promise<number | null> {
    const keys = await getLogsByUser(userId);
    if (keys.length === 0) {
        return null;
    }
    
    // Lấy TTL của key đầu tiên
    const ttl = await redis.ttl(keys[0]);
    return ttl > 0 ? ttl : null;
}
