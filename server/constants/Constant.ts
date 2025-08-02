import { EActionType } from './Enum';

export const COMMANDS = {
    init: 'init',
    info: 'info',
    update: 'update',
    meme: 'meme'
};

export const ACTIONS = {
    // SELF ACTIONS
    blush: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang đỏ mặt!`
    },
    bored: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang cảm thấy chán nản!`
    },
    cry: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang khóc!`
    },
    happy: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang cảm thấy vui vẻ!`
    },
    run: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang chạy!`
    },
    sleep: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang ngủ!`
    },
    smile: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang mỉm cười!`
    },
    smug: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang cảm thấy tự mãn!`
    },
    think: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang suy nghĩ!`
    },
    yawn: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang ngáp!`
    },
    nom: {
        type: EActionType.Self,
        getMessage: (user: string) => `${user} đang nhăm nhăm!`
    },

    // INTERACTIVE ACTIONS
    baka: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user}: ${target} baka!`
    },
    laugh: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang cười vào mặt ${target}!`
    },
    lurk: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang lén lút nhìn ${target}!`
    },
    nod: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đồng ý với ${target}!`
    },
    nope: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} không đồng ý với ${target}!`
    },
    stare: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang nhìn chằm chằm ${target}!`
    },
    thumbsup: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã tặng 1 like cho ${target}!`
    },
    wave: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang đã vẫy tay với ${target}!`
    },
    wink: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang nháy mắt với ${target}!`
    },
    yeet: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã ném ${target} ra chuồng gà!`
    },
    bite: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã cắn ${target}!`
    },
    cuddle: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã tặng cho ${target} 1 cái ôm!`
    },
    feed: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang đút cho ${target} ăn!`
    },
    handhold: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang nắm tay ${target}!`
    },
    handshake: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang bắt tay với ${target}!`
    },
    highfive: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã đập tay với ${target}!`
    },
    hug: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã ôm ${target} một cái thật chặt!`
    },
    kick: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang đá ${target}!`
    },
    kiss: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã hôn ${target}!`
    },
    pat: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang xoa đầu ${target}!`
    },
    peck: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã hôn nhẹ lên má của ${target}!`
    },
    poke: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang chọc ${target}!`
    },
    punch: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang đấm ${target}!`
    },
    shoot: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã bắn ${target}!`
    },
    slap: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đã tát ${target}!`
    },
    tickle: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang cù ${target}!`
    },
    shrug: {
        type: EActionType.Interactive,
        getMessage: (user: string, target?: string) =>
            `${user} đang không biết nói gì!`
    },

    // FLEXIBLE ACTIONS
    angry: {
        type: EActionType.Flexible,
        getMessage: (user: string, target?: string) =>
            target
                ? `${user} đang nổi giận với ${target}!`
                : `${user} đang rất tức giận!`
    },
    dance: {
        type: EActionType.Flexible,
        getMessage: (user: string, target?: string) =>
            target
                ? `${user} đang nhảy với ${target}!`
                : `${user} đang nhảy trong sự cô đơn!`
    },
    facepalm: {
        type: EActionType.Flexible,
        getMessage: (user: string, target?: string) =>
            target
                ? `${user} đang cảm thấy thất vọng về ${target}!`
                : `${user} đang cảm thấy thất vọng!`
    },
    pout: {
        type: EActionType.Flexible,
        getMessage: (user: string, target?: string) =>
            target ? `"${user}" đang dỗi "${target}"!` : `${user} đang dỗi!`
    }
};
