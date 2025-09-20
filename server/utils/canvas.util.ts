import { BATTLE_CARD_HEIGHT, BATTLE_CARD_WIDTH, ERarityEmoji, IBPet, PROFILE_CARD_BG } from '@/constants';
import { CanvasRenderingContext2D, createCanvas, loadImage, registerFont } from 'canvas';
import axios from 'axios';

import path from 'path';

registerFont(path.join(process.cwd(), 'assets/fonts/OpenSans-Regular.ttf'), {
    family: 'OpenSans',
    style: 'normal'
});

registerFont(path.join(process.cwd(), 'assets/fonts/OpenSans-Bold.ttf'), {
    family: 'OpenSans',
    weight: 'bold',
    style: 'bold'
});

const drawTeamPets = async (
    ctx: CanvasRenderingContext2D,
    team: IBPet[],
    teamX: number,
    isRightTeam: boolean
): Promise<void> => {
    const startY = 70;
    const spacing = 140;
    const maxPets = Math.min(team.length, 3);

    for (let i = 0; i < maxPets; i++) {
        const pet = team[i];

        const x = teamX;
        const y = startY + i * spacing;

        const cardWidth = 350;
        const cardHeight = 120;

        const barWidth = 200;
        const barHeight = 16;

        let barsX, avatarX, statsStartX, nameX;
        if (isRightTeam) {
            barsX = x + 40;
            avatarX = x + cardWidth - 90;
            statsStartX = x + 40;
            nameX = x + 40;
        } else {
            barsX = x + 110;
            avatarX = x + 10;
            statsStartX = x + 110;
            nameX = x + 110;
        }

        const hpY = y + 25;
        const manaY = y + 50;
        const statsY = y + 80;

        ctx.fillStyle = '#3A3A3A';
        ctx.strokeStyle = '#5A5A5A';
        ctx.lineWidth = 2;

        ctx.save();
        ctx.beginPath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            const response = await axios.get(pet.info.avatar, {
                responseType: 'arraybuffer',
                signal: controller.signal,
                maxRedirects: 3,
                timeout: 10000
            });
            clearTimeout(timeoutId);
            const petImage = await loadImage(Buffer.from(response.data));
            const avatarSize = 80;

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(avatarX, y + 20, avatarSize, avatarSize, 8);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(petImage, avatarX, y + 20, avatarSize, avatarSize);
            ctx.restore();

            // Draw avatar border
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(avatarX, y + 20, avatarSize, avatarSize, 8);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#F3AAB5';
            ctx.stroke();
            ctx.restore();
        } catch (error) {
            console.error('Error drawing pet card:', error);
        }

        const currentHp = pet.stats.currentStats.hp;
        const maxHp = pet.stats.originalStats.hp;
        const currentMana = pet.stats.currentStats.mana;
        const maxMana = pet.info.activeSkill.manaCost;
        const hpPercent = Math.max(0, currentHp / maxHp);
        const manaPercent = Math.max(0, currentMana / maxMana);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Sans';
        
        // Vẽ rarity emoji image
        try {
            const rarityController = new AbortController();
            const rarityTimeoutId = setTimeout(() => rarityController.abort(), 5000);
            const rarityResponse = await axios.get(ERarityEmoji[pet.info.rarity], {
                responseType: 'arraybuffer',
                signal: rarityController.signal,
                maxRedirects: 3,
                timeout: 5000
            });
            clearTimeout(rarityTimeoutId);
            const rarityImage = await loadImage(Buffer.from(rarityResponse.data));
            const raritySize = 40;
            
            if (isRightTeam) {
                ctx.textAlign = 'left';
                ctx.drawImage(rarityImage, nameX -5, hpY - 35, raritySize, raritySize);
                ctx.fillText(pet.info.nickname ?? '', nameX + raritySize + 5, hpY - 10);
            } else {
                ctx.textAlign = 'right';
                ctx.drawImage(rarityImage, nameX + barWidth - raritySize + 5, hpY - 35, raritySize, raritySize);
                ctx.fillText(pet.info.nickname ?? '', nameX + barWidth - raritySize - 5, hpY - 10);
            }
        } catch (error) {
            console.error('Error loading rarity image:', error);
            // Fallback to text only if image fails
            if (isRightTeam) {
                ctx.textAlign = 'left';
                ctx.fillText(pet.info.nickname ?? '', nameX, hpY - 10);
            } else {
                ctx.textAlign = 'right';
                ctx.fillText(pet.info.nickname ?? '', nameX + barWidth, hpY - 10);
            }
        }

        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(barsX, hpY, barWidth, barHeight);

        ctx.fillStyle = hpPercent > 0.5 ? '#4CAF50' : hpPercent > 0.25 ? '#FF9800' : '#F44336';
        if (isRightTeam) {
            ctx.fillRect(barsX + barWidth * (1 - hpPercent), hpY, barWidth * hpPercent, barHeight);
        } else {
            ctx.fillRect(barsX, hpY, barWidth * hpPercent, barHeight);
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Sans';
        if (isRightTeam) {
            ctx.textAlign = 'left';
            ctx.fillText(`${currentHp}/${maxHp}`, barsX + 5, hpY + 12);
        } else {
            ctx.textAlign = 'right';
            ctx.fillText(`${currentHp}/${maxHp}`, barsX + barWidth - 5, hpY + 12);
        }
        ctx.textAlign = 'left';

        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(barsX, manaY, barWidth, barHeight);

        ctx.fillStyle = '#2196F3';
        if (isRightTeam) {
            ctx.fillRect(barsX + barWidth * (1 - manaPercent), manaY, barWidth * manaPercent, barHeight);
        } else {
            ctx.fillRect(barsX, manaY, barWidth * manaPercent, barHeight);
        }

        ctx.fillStyle = '#FFFFFF';
        if (isRightTeam) {
            ctx.textAlign = 'left';
            ctx.fillText(`${currentMana}/${maxMana}`, barsX + 5, manaY + 12);
        } else {
            ctx.textAlign = 'right';
            ctx.fillText(`${currentMana}/${maxMana}`, barsX + barWidth - 5, manaY + 12);
        }
        ctx.textAlign = 'left';

        const stats = [
            { label: 'AD', value: pet.stats.currentStats.ad, color: '#FF6347' },
            { label: 'AP', value: pet.stats.currentStats.ap, color: '#87CEEB' },
            { label: 'AR', value: pet.stats.currentStats.ar, color: '#D2B48C' },
            { label: 'MR', value: pet.stats.currentStats.mr, color: '#DA70D6' }
        ];
        const statsLength = stats.length;

        ctx.font = '11px Sans';
        for (let j = 0; j < statsLength; j++) {
            const statX = statsStartX + j * 60;
            const stat = stats[j];

            ctx.fillStyle = stat.color;
            ctx.fillText(stat.label, statX, statsY);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(`${stat.value}`, statX, statsY + 15);
        }
    }
};

const renderBattleCanvas = async (teamA: IBPet[], teamB: IBPet[], teamAName: string, teamACP: number, teamBName: string, teamBCP: number): Promise<Buffer> => {
    const width = BATTLE_CARD_WIDTH;
    const height = BATTLE_CARD_HEIGHT;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2C2F33';
    ctx.fillRect(0, 0, width, height);

    // Vẽ tên team và CP ở trên cùng
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Sans';
    ctx.textAlign = 'left';
    ctx.fillText(`${teamAName}`, 80, 30);
    ctx.fillText(`CP: ${teamACP.toLocaleString()}`, 80, 55);

    ctx.textAlign = 'right';
    ctx.fillText(`${teamBName}`, width - 80, 30);
    ctx.fillText(`CP: ${teamBCP.toLocaleString()}`, width - 80, 55);

    await drawTeamPets(ctx, teamA, 50, false);
    await drawTeamPets(ctx, teamB, 400, true);

    return canvas.toBuffer('image/jpeg');
};

export async function createBattleImage(teamA: IBPet[], teamB: IBPet[], teamAName: string, teamACP: number, teamBName: string, teamBCP: number) {
    try {
        const imageBuffer = await renderBattleCanvas(teamA, teamB, teamAName, teamACP, teamBName, teamBCP);
        return imageBuffer;
    } catch (error) {
        console.error('❌ Error when rendering battle canvas:', error);
        throw error;
    }
}

// Interface cho profile data
interface ProfileData {
    username: string;
    level: number;
    z_coin: number;
    combat_power: number;
    currentXP: number;
    nextLevelXP: number;
    avatar: string;
}

// Hàm vẽ profile card giống như hình ảnh
const renderProfileCanvas = async (profileData: ProfileData): Promise<Buffer> => {
    const width = 1200;
    const height = 360;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Load và vẽ background image
    const backgroundImage = await loadImage(PROFILE_CARD_BG);

    // Vẽ background image để fill toàn bộ canvas
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // Thêm overlay tối để text dễ đọc hơn
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    // Vẽ avatar từ ảnh
    const avatarSize = 240; // Tăng từ 180 lên 240
    const avatarX = 60; // Dịch sang trái từ 150 về 80
    const avatarY = height / 2 - avatarSize / 2;

    // Load và vẽ avatar image
    const avatarImage = await loadImage(profileData.avatar!);

    // Vẽ avatar với border tròn
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // Border cho avatar
    ctx.strokeStyle = '#F3AAB5';
    ctx.lineWidth = 8; // Tăng từ 5 lên 8
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.stroke();

    // Vẽ thông tin text
    const textX = avatarX + avatarSize + 50; // Tăng khoảng cách từ avatar
    const textY = height / 2 - 80; // Căn giữa theo chiều dọc để ngang hàng với avatar

    // Username
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px Sans'; // Tăng từ 42px lên 56px
    ctx.textAlign = 'left';
    ctx.fillText(profileData.username, textX, textY);

    // Level
    ctx.font = 'bold 40px Sans'; // Tăng từ 32px lên 40px
    ctx.fillText(`LV. ${profileData.level}`, textX, textY + 70);

    // XP
    ctx.font = 'bold 32px Sans';
    ctx.fillText(
        `EXP: ${profileData.currentXP.toLocaleString()} / ${profileData.nextLevelXP.toLocaleString()}`,
        textX + 250,
        textY + 70
    );

    // Z-Coin (xuống dòng dưới level)
    ctx.font = '32px Sans'; // Tăng từ 24px lên 32px
    ctx.fillText(`Z-Coin: ${profileData.z_coin.toLocaleString()}`, textX, textY + 120);

    // Combat Power
    ctx.font = '32px Sans'; // Tăng từ 24px lên 32px
    ctx.fillText(`CP: ${profileData.combat_power.toLocaleString()}`, textX + 280, textY + 120);

    // Vẽ progress bar
    const barX = textX;
    const barY = textY + 170; // Dịch xuống dưới thêm để cân bằng với text đã lên trên
    const barWidth = 600; // Tăng từ 500 lên 600
    const barHeight = 40; // Tăng từ 30 lên 40

    // Background của progress bar
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Border của progress bar
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4; // Tăng từ 3 lên 4
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Fill của progress bar
    const progressPercent = profileData.currentXP / profileData.nextLevelXP;
    const fillWidth = barWidth * progressPercent;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(barX, barY, fillWidth, barHeight);

    return canvas.toBuffer('image/jpeg');
};

export async function createProfileCard(profileData: ProfileData) {
    try {
        const imageBuffer = await renderProfileCanvas(profileData);
        return imageBuffer;
    } catch (error) {
        console.error('❌ Error when rendering profile canvas:', error);
        throw error;
    }
}
