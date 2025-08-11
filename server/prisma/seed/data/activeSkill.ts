import { EAttackType, EEffect, EEffectTarget, ETargetPosition } from "@prisma/client";

export type ActiveSkillSeed = {
    pet_id: number
    name: string
    description: string
    mana_cost: number
    attack_type: EAttackType
    damage?: number
    attack_position?: ETargetPosition
    attack_target_count?: number
};

export const activeSkillSeedData: ActiveSkillSeed[] = [
    {
        pet_id: 9,
        name: "Fatal Strike",
        description: "Tí tung đòn chí mạng, gây sát thương bằng 235% AD lên mục tiêu yếu nhất. Nếu hạ gục được kẻ địch, Tí bùng nổ sức mạnh, tăng 30% ATK trong 2 lượt.",
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 235,
        attack_position: ETargetPosition.LowestHP,
        attack_target_count: 1
    },
    {
        pet_id: 10,
        name: "Iron Retribution",
        description: "Sửu hóa thành pháo đài sống, tăng 20% ATK cho toàn bộ đồng minh và phản lại 20% sát thương nhận vào cho kẻ tấn công trong 2 lượt. ",
        mana_cost: 100,
        attack_type: EAttackType.Physical
    },
    {
        pet_id: 11,
        name: "Wild Carnage",
        description: "Dần gầm lên giận dữ, gây sát thương bằng 185% AD lên toàn bộ kẻ địch. Tiếp đó Dần tăng 20% hút máu trong 2 lượt để tiếp tục cuộc tàn sát.",
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 185,
        attack_position: ETargetPosition.All,
        attack_target_count: 3
    },
    {
        pet_id: 12,
        name: "Moonlit Grace",
        description: "Mão triệu hồi ánh trăng dịu dàng, hồi HP cho toàn bộ đồng minh bằng 185% AP của mình. Ánh sáng trăng còn ban phước, tăng 20% DEF cho cả đội trong 2 lượt.",
        mana_cost: 100,
        attack_type: EAttackType.Magical
    },
    {
        pet_id: 13,
        name: "Divine Wrath",
        description: "Thìn phát ra tiếng gầm sấm sét, gây sát thương bằng 185% AP lên toàn bộ kẻ địch. Sức mạnh của rồng làm suy yếu ý chí chiến đấu, giảm 20% ATK của kẻ địch trong 2 lượt",
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 185,
        attack_position: ETargetPosition.All,
        attack_target_count: 3
    },
    {
        pet_id: 14,
        name: "Venomous Whisper",
        description: "Tỵ thì thầm lời nguyền độc địa, gây sát thương bằng 200% AP lên 2 kẻ địch có HP cao nhất. Lời nguyền khóa chặt giọng nói của chúng, áp dụng hiệu ứng câm lặng trong 1 lượt.",
        mana_cost: 100,
        attack_type: EAttackType.Magical,
        damage: 200,
        attack_position: ETargetPosition.HighestHP,
        attack_target_count: 2
    },
    {
        pet_id: 15,
        name: "Savage Trample",
        description: "Ngọ giẫm đạp dã man, gây sát thương bằng 235% AD lên một mục tiêu ngẫu nhiên. Vết thương từ cú giẫm đạp gây đau đớn tột cùng, giảm 40% khả năng hồi máu của mục tiêu trong 2 lượt.",
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 235,
        attack_position: ETargetPosition.Random,
        attack_target_count: 1
    },
    {
        pet_id: 16,
        name: "Eternal Shepherd",
        description: "Mùi ban phát ân điển vĩnh cửu, hồi sinh một đồng minh đã ngã xuống với 30% HP (chỉ có thể sử dụng 1 lần mỗi trận). Nếu không có ai cần hồi sinh, Mùi chữa lành đồng minh yếu nhất bằng 15% HP tối đa của họ.",
        mana_cost: 100,
        attack_type: EAttackType.Magical
    },
    {
        pet_id: 17,
        name: "Shadow Frenzy",
        description: "Thân hóa thành bóng tối cuồng loạn, tung 3 đòn đánh chí mạng vào mục tiêu yếu nhất, mỗi đòn gây 80% AD. Mỗi cú đánh có 70% cơ hội xé toạc phòng thủ, giảm 15% DEF trong 2 lượt, cộng dồn tối đa đến 45%.",
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 240,
        attack_position: ETargetPosition.LowestHP,
        attack_target_count: 1
    },
    {
        pet_id: 18,
        name: "Dawn's Rally",
        description: "Dậu gáy vang hiệu lệnh bình minh, gây sát thương bằng 185% AD lên toàn bộ kẻ địch. Tiếng gáy truyền sức mạnh, tăng 25% ATK và 25% DEF cho toàn bộ đồng minh (trừ Dậu) trong 2 lượt.",
        mana_cost: 100,
        attack_type: EAttackType.Physical,
        damage: 185,
        attack_position: ETargetPosition.All,
        attack_target_count: 3
    },
    {
        pet_id: 19,
        name: "Ironbark Howl",
        description: "Tuất phát ra tiếng hú vang dội như vỏ sắt, tăng 30% DEF cho bản thân trong 2 lượt. Tiếng hú gây kinh hoàng, giảm 20% ATK của toàn bộ kẻ địch trong 2 lượt.",
        mana_cost: 100,
        attack_type: EAttackType.Physical
    },
    {
        pet_id: 20,
        name: "Stalwart Bulwark",
        description: "Hợi hóa thành tấm chắn kiên cường, tăng 20% DEF cho toàn bộ đồng minh và đồng thời Hợi còn hồi phục 10% HP tối đa cho bản thân mỗi lượt trong 2 lượt.",
        mana_cost: 100,
        attack_type: EAttackType.Physical
    }
];

