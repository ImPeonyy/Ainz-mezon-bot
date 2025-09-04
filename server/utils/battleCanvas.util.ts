import { CanvasRenderingContext2D, createCanvas, loadImage } from 'canvas';
import { IBPet } from '@/constants/Type';
import path from 'path';
import fs from 'fs';
import { BATTLE_CARD_HEIGHT, BATTLE_CARD_WIDTH } from '@/constants/Constant';

const drawTeamPets = async (
    ctx: CanvasRenderingContext2D,
    team: IBPet[],
    teamX: number,
    isRightTeam: boolean = false
): Promise<void> => {
    const startY = 20;
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
            const petImage = await loadImage(pet.info.avatar);
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
        ctx.font = 'bold 13px Arial';
        if (isRightTeam) {
            ctx.textAlign = 'left';
            ctx.fillText(pet.info.nickname ?? '', nameX, hpY - 10);
        } else {
            ctx.textAlign = 'right';
            ctx.fillText(pet.info.nickname ?? '', nameX + barWidth, hpY - 10);
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
        ctx.font = 'bold 12px Arial';
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
            { label: 'AD', value: pet.stats.currentStats.ad, color: '#FF6B6B' },
            { label: 'AP', value: pet.stats.currentStats.ap, color: '#96CEB4' },
            { label: 'AR', value: pet.stats.currentStats.ar, color: '#4ECDC4' },
            { label: 'MR', value: pet.stats.currentStats.mr, color: '#45B7D1' }
        ];
        const statsLength = stats.length;

        ctx.font = '11px Arial';
        for (let j = 0; j < statsLength; j++) {
            const statX = statsStartX + j * 50;
            const stat = stats[j];

            ctx.fillStyle = stat.color;
            ctx.fillText(stat.label, statX, statsY);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(`${stat.value}`, statX, statsY + 15);
        }
    }
};

const renderBattleCanvas = async (teamA: IBPet[], teamB: IBPet[]): Promise<Buffer> => {
    const width = BATTLE_CARD_WIDTH;
    const height = BATTLE_CARD_HEIGHT;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2C2F33';
    ctx.fillRect(0, 0, width, height);
    await drawTeamPets(ctx, teamA, 50, false);
    await drawTeamPets(ctx, teamB, 400, true);

    return canvas.toBuffer('image/jpeg');
};

export async function createBattleImage(teamA: IBPet[], teamB: IBPet[]) {
    try {
        const imageBuffer = await renderBattleCanvas(teamA, teamB);

        // const tempDir = path.join(process.cwd(), 'tempimage');
        // if (!fs.existsSync(tempDir)) {
        //     fs.mkdirSync(tempDir, { recursive: true });
        // }

        // const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        // const filename = `battle-result-${timestamp}.png`;
        // const filepath = path.join(tempDir, filename);

        // fs.writeFileSync(filepath, imageBuffer);

        // console.log(`✅ Battle image has been saved at: ${filepath}`);

        return imageBuffer;
    } catch (error) {
        console.error('❌ Error when rendering battle canvas:', error);
        throw error;
    }
}
