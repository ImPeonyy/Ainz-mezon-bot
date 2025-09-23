import { redis } from '@/configs';
import { DEFAULT_TTL } from '@/constants';
import { User } from '@prisma/client';

const TTL = Number(process.env.DEFAULT_TTL) || DEFAULT_TTL;

export async function logBattleWithExpire(user: User, expireInSeconds: number = TTL): Promise<void> {
    const key = `battle:${user.username}-${user.id}:${Date.now()}`;
    await redis.set(key, '1', 'EX', expireInSeconds);
    console.log(`⚔️ Logged battle for user ${user.id} with TTL ${expireInSeconds}s`);
}

export async function getBattlesLogByUser(user: User): Promise<string[]> {
    const pattern = `battle:${user.username}-${user.id}:*`;
    const keys: string[] = [];

    let cursor = '0';
    do {
        const [newCursor, foundKeys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = newCursor;
        keys.push(...foundKeys);
    } while (cursor !== '0');

    return keys;
}

export async function hasActiveBattleLog(user: User): Promise<number | null> {
    const keys = await getBattlesLogByUser(user);
    if (keys.length === 0) {
        return null;
    }
    
    // Lấy TTL của key đầu tiên
    const ttl = await redis.ttl(keys[0]);
    return ttl > 0 ? ttl : null;
}

export async function logChallengeWithExpire(user: User, expireInSeconds=TTL): Promise<void> {
    const key = `challenge:${user.username}-${user.id}:${Date.now()}`;
    await redis.set(key, '1', 'EX', expireInSeconds);
    console.log(`🏆 Logged challenge for user ${user.id} with TTL ${expireInSeconds}s`);
}

export async function getChallengesLogByUser(user: User): Promise<string[]> {
    const pattern = `challenge:${user.username}-${user.id}:*`;
    const keys: string[] = [];

    let cursor = '0';
    do {
        const [newCursor, foundKeys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = newCursor;
        keys.push(...foundKeys);
    } while (cursor !== '0');

    return keys;
}

export async function hasActiveChallengeLog(user: User): Promise<number | null> {
    const keys = await getChallengesLogByUser(user);
    if (keys.length === 0) {
        return null;
    }
    
    // Lấy TTL của key đầu tiên
    const ttl = await redis.ttl(keys[0]);
    return ttl > 0 ? ttl : null;
}

export async function removeChallengeLog(user: User): Promise<void> {
    const keys = await getChallengesLogByUser(user);
    if (keys.length > 0) {
        await redis.del(...keys);
        console.log(`🗑️ Removed ${keys.length} challenge logs for user ${user.id}`);
    }
}
