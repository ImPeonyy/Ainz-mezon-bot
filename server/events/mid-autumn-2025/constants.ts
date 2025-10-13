export interface ISymbol {
    id: number;
    name: string;
    channel_id: string;
}

export const FOUR_SYMBOLS: { [key: string]: ISymbol } = {
    TL: {
        id: 58,
        name: 'Thanh Long',
        channel_id: '1975936479154671616'
    },
    BH: {
        id: 59,
        name: 'Bạch Hổ',
        channel_id: '1975936731307839488'
    },
    CT: {
        id: 60,
        name: 'Chu Tước',
        channel_id: '1975936942952419328'
    },
    HV: {
        id: 61,
        name: 'Huyển Vũ',
        channel_id: '1975937228756488192'
    }
};
