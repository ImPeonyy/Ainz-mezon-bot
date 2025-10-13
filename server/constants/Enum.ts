export enum EActionType {
    SELF = 'self',
    INTERACTIVE = 'interactive',
    FLEXIBLE = 'flexible'
}

export enum ERarityColor {
    COMMON = '#9fa6b0',
    UNCOMMON = '#4fb279',
    RARE = '#52b2da',
    EPIC = '#958ad8',
    LEGENDARY = '#ffca4a',
    MYTHIC = '#f5622e',
    LIMITED = '#ffffff'
}

export enum ERarityEmoji {
    Common = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758388258/common_tj5x5n.png',
    Uncommon = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758388527/uncommon_rb7rpy.png',
    Rare = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758388527/rare_wxynxy.png',
    Epic = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758388527/epic_vbh3dc.png',
    Legendary = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758388526/legendary_uinrdk.png',
    Mythic = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758388526/mythic_avmujp.png',
    Limited = 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1758388525/limited_xrmymh.png'
}

export enum EChallengeStatus {
    ACCEPTED = 'challenge_accepted',
    REJECTED = 'challenge_rejected',
    EXPIRED = 'challenge_expired'
}

export enum EShopExchangeStatus {
    EXCHANGE = 'shop_exchange',
    CANCEL = 'shop_cancel',
    EXPIRED = 'shop_expired'
}

export enum EShopUpLevelPetStatus {
    UP_LEVEL = 'shop_up_level',
    CANCEL = 'shop_cancel',
    EXPIRED = 'shop_expired'
}

export enum EShopUpLevelPet {
    USER_PET_ID = 'user_pet_id'
}

export enum EShopExchange {
    MEZON_TOKEN = 'mezon_token_value'
}

export enum EPriceByRarity {
    COMMON = 1000,
    UNCOMMON = 2000,
    RARE = 3000,
    EPIC = 4000,
    LEGENDARY = 5000,
    MYTHIC = 6000,
    LIMITED = 7000
}

export enum EGachaCountType {
    NORMAL = 'normal',
    MID_AUTUMN_2025 = 'mid_autumn_2025'
}

export enum EGachaStatus {
    GACHA = 'gacha',
    CANCEL = 'cancel',
}


export enum EHuntMenuStatus {
    CANCEL = 'cancel',
    FREE_HUNT = 'free_hunt',
    HUNT_X1 = 'hunt_x1',
    HUNT_X5 = 'hunt_x5',
    HUNT_X30 = 'hunt_x30',
}

export enum EInteractiveMessageType {
    EXCHANGE,
    UPLV,
    GACHA,
    HUNT
}

export enum EAsyncMutexMsgType {
    HUNT,
    UPLV,
    EXCHANGE
}
