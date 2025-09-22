import { EActionType } from './Enum';

export const COMMANDS = {
    init: 'init',
    info: 'info',
    update: 'update',
    meme: 'meme',
    bag: 'bag',
    hunt: 'hunt',
    dex: 'dex',
    mydex: 'mydex',
    daily: 'daily',
    battle: 'battle',
    help: 'help',
    team: 'team',
    rename: 'rename',
    leaderboard: 'lb',
    withdraw: 'wd',
    balance: 'balance',
};

export const ACTIONS = {
    // SELF ACTIONS
    blush: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang cảm thấy ngượng ngùng!`
    },
    bored: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang cảm thấy chán nản!`
    },
    cry: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang khóc!`
    },
    happy: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang cảm thấy vui vẻ!`
    },
    run: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang sủi!`
    },
    sleep: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang ngủ!`
    },
    smug: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang cảm thấy tự mãn!`
    },
    think: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang suy nghĩ!`
    },
    yawn: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang cảm thấy buồn ngủ!`
    },
    nom: {
        type: EActionType.SELF,
        getMessage: (user: string) => `${user} đang nhăm nhăm!`
    },

    // INTERACTIVE ACTIONS
    baka: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang chửi ${target} là m ngu !`
    },
    laugh: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang cười vào mặt ${target}!`
    },
    lurk: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang lén lút nhìn ${target}!`
    },
    nod: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đồng ý với ${target}!`
    },
    nope: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} không đồng ý với ${target}!`
    },
    stare: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang nhìn chằm chằm ${target}!`
    },
    thumbsup: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã tặng cho ${target} 1 like !`
    },
    wave: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang đã vẫy tay với ${target}!`
    },
    wink: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang nháy mắt với ${target}!`
    },
    yeet: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã ném ${target} ra chuồng gà!`
    },
    bite: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang cắn ${target}!`
    },
    cuddle: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã tặng cho ${target} 1 cái ôm!`
    },
    feed: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang đút cho ${target} ăn!`
    },
    handhold: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang nắm tay ${target}!`
    },
    handshake: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang bắt tay với ${target}!`
    },
    highfive: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã đập tay với ${target}!`
    },
    hug: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã ôm ${target} một cái thật chặt!`
    },
    kick: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã đá vào mặt ${target}!`
    },
    // kiss: {
    //     type: EActionType.INTERACTIVE,
    //     getMessage: (user: string, target?: string) => `${user} đang hôn ${target}!`
    // },
    pat: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang xoa đầu ${target}!`
    },
    peck: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã hôn nhẹ lên má của ${target}!`
    },
    poke: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang chọc ${target}!`
    },
    punch: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã đấm vào mặt ${target}!`
    },
    shoot: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã bắn vào mặt ${target}!`
    },
    slap: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đã tát vào mặt ${target}!`
    },
    tickle: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang cù ${target}!`
    },
    shrug: {
        type: EActionType.INTERACTIVE,
        getMessage: (user: string, target?: string) => `${user} đang không biết nói gì!`
    },

    // FLEXIBLE ACTIONS
    angry: {
        type: EActionType.FLEXIBLE,
        getMessage: (user: string, target?: string) =>
            target ? `${user} đang nổi giận với ${target}!` : `${user} đang rất tức giận!`
    },
    dance: {
        type: EActionType.FLEXIBLE,
        getMessage: (user: string, target?: string) =>
            target ? `${user} đang nhảy với ${target}!` : `${user} đang nhảy trong sự cô đơn!`
    },
    facepalm: {
        type: EActionType.FLEXIBLE,
        getMessage: (user: string, target?: string) =>
            target ? `${user} đang cảm thấy thất vọng về ${target}!` : `${user} đang cảm thấy thất vọng!`
    },
    pout: {
        type: EActionType.FLEXIBLE,
        getMessage: (user: string, target?: string) =>
            target ? `"${user}" đang dỗi "${target}"!` : `${user} đang dỗi!`
    },
    smile: {
        type: EActionType.FLEXIBLE,
        getMessage: (user: string, target?: string) =>
            target ? `${user} đang mỉm cười với ${target}!` : `${user} đang mỉm cười!`
    }
};
