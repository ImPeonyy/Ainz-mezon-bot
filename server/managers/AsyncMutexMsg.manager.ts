import { EAsyncMutexMsgType } from '@/constants';
import { Mutex } from 'async-mutex';

/**
 * Quản lý các mutex theo userId và type cụ thể.
 * Dùng để đảm bảo mỗi user chỉ có thể thực hiện 1 hành động nhất định tại 1 thời điểm.
 */
export interface AsyncMutexMsg {
    userId: string;
    type: EAsyncMutexMsgType;
}

class AsyncMutexMsgManager {
    private locks: Map<string, Mutex>;

    constructor() {
        this.locks = new Map();
    }

    /**
     * Sinh key duy nhất từ userId và type.
     */
    private getKey({ userId, type }: AsyncMutexMsg): string {
        return `${type}-${userId}`;
    }

    /**
     * Lấy hoặc tạo mutex theo userId và type.
     */
    private getMutex(key: string): Mutex {
        if (!this.locks.has(key)) {
            this.locks.set(key, new Mutex());
        }
        return this.locks.get(key)!;
    }

    /**
     * Kiểm tra xem mutex của userId + type có đang bị lock không.
     */
    isLocked({ userId, type }: AsyncMutexMsg): boolean {
        const key = this.getKey({ userId, type });
        const mutex = this.locks.get(key);
        return mutex ? mutex.isLocked() : false;
    }

    /**
     * Chạy callback trong vùng độc quyền (lock).
     */
    async runExclusive<T>(
        { userId, type }: AsyncMutexMsg,
        fn: () => Promise<T>
    ): Promise<T> {
        const key = this.getKey({ userId, type });
        const mutex = this.getMutex(key);

        return await mutex.runExclusive(async () => {
            try {
                return await fn();
            } finally {
                // Dọn dẹp nếu mutex đã được giải phóng
                if (!mutex.isLocked()) {
                    this.locks.delete(key);
                }
            }
        });
    }
}

/**
 * Singleton pattern — chỉ có 1 instance cho toàn bộ ứng dụng
 */
export const asyncMutexMsgManager = new AsyncMutexMsgManager();
