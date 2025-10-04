export interface ISymbol {
    id: number;
    name: string;
    channel_id: string;
}

export const FOUR_SYMBOLS: { [key: string]: ISymbol } = {
    TL: {
        id: 58,
        name: 'Thanh Long',
        channel_id: '1974503586687619072'
    },
    BH: {
        id: 59,
        name: 'Bạch Hổ',
        channel_id: '1974502309241032704'
    },
    CT: {
        id: 60,
        name: 'Chu Tước',
        channel_id: '1974502226911039488'
    },
    HV: {
        id: 61,
        name: 'Huyển Vũ',
        channel_id: '1974502150453071872'
    }
};
