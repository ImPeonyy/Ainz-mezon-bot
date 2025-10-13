// src/managers/InteractiveMessageManager.ts

import { EInteractiveMessageType } from '@/constants';
import { textMessage } from '@/utils';

export interface InteractiveMessage {
    userId: string;
    message: any;
    expireTimer: NodeJS.Timeout | null;
    type: EInteractiveMessageType;
}

class InteractiveMessageManager {
    private activeMessages: Map<string, InteractiveMessage[]> = new Map();

    /** Lấy danh sách message của 1 user */
    public getUserMessages(userId: string): InteractiveMessage[] {
        return this.activeMessages.get(userId) || [];
    }

    /** Kiểm tra user có message của loại cụ thể không */
    public has(userId: string, type?: EInteractiveMessageType): boolean {
        const list = this.getUserMessages(userId);
        return type ? list.some((m) => m.type === type) : list.length > 0;
    }

    /** Đăng ký message mới (tự đóng cái cũ nếu cùng loại) */
    public async register(msg: InteractiveMessage) {
        // 🔒 Nếu có cùng loại -> đóng cái cũ trước
        const duplicate = this.has(msg.userId, msg.type);
        if (duplicate) {
            await this.forceClose(msg.userId, msg.type, '🔁 Previous interaction closed automatically.');
        }

        // Thêm message mới
        this.activeMessages.set(msg.userId, [msg]);
    }

    /** Đóng message (có thể chỉ loại cụ thể hoặc tất cả) */
    public async forceClose(userId: string, type?: EInteractiveMessageType, reason = '🔒 Interaction closed.') {
        const list = this.getUserMessages(userId);
        if (list.length === 0) return false;

        const targets = type ? list.filter((m) => m.type === type) : list;

        for (const msg of targets) {
            if (msg.expireTimer) clearTimeout(msg.expireTimer);

            try {
                await msg.message.update(textMessage(reason));
            } catch (err) {
                console.error('Error updating message:', err);
            }
        }

        // Cập nhật lại list sau khi xoá
        const remaining = type ? list.filter((m) => m.type !== type) : [];
        if (remaining.length > 0) this.activeMessages.set(userId, remaining);
        else this.activeMessages.delete(userId);
        return true;
    }

    /** Đóng toàn bộ messages (vd: khi bot restart) */
    public async clearAll(reason = '🔒 All interactions cleared.') {
        for (const [userId] of this.activeMessages) {
            await this.forceClose(userId, undefined, reason);
        }
        this.activeMessages.clear();
    }
}

export const interactiveMsgManager = new InteractiveMessageManager();