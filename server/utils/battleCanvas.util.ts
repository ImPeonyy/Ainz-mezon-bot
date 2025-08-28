import { createCanvas, loadImage } from 'canvas';
import { IFPet } from '@/constants/Type';
import * as fs from 'fs';
import * as path from 'path';

const renderBattleCanvas = async (teamA: IFPet[], teamB: IFPet[]): Promise<Buffer> => {
    const width = 800;
    const height = 600;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2C2F33';
    ctx.fillRect(0, 0, width, height);

    const teamLength = {
        teamA: Math.min(teamA.length, 3),
        teamB: Math.min(teamB.length, 3)
    }

    // Draw team A pets
    for (let i = 0; i < teamLength.teamA; i++) {
        const pet = teamA[i];
        
        // Pet card drawing logic (gộp từ drawSimplePetCard)
        const startY = 50;
        const spacing = 140;
        const teamAX = 50;
        
        const x = teamAX;
        const y = startY + (i * spacing);
        
        const cardWidth = 350;
        const cardHeight = 120;

        // Draw card background
        ctx.fillStyle = '#3A3A3A';
        ctx.strokeStyle = '#5A5A5A';
        ctx.lineWidth = 2;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, cardWidth, cardHeight, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Draw pet avatar
        try {
            const petImage = await loadImage(pet.info.avatar);
            const avatarSize = 80;

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x + 10, y + 20, avatarSize, avatarSize, 8);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(petImage, x + 10, y + 20, avatarSize, avatarSize);
            ctx.restore();
        } catch (error) {
            console.error('Error drawing pet card:', error);
        }

        // Draw HP and Mana bars
        const currentHp = pet.stats.currentStats.hp;
        const maxHp = pet.stats.originalStats.hp;
        const currentMana = pet.stats.currentStats.mana;
        const maxMana = pet.stats.originalStats.mana;
        const hpPercent = Math.max(0, currentHp / maxHp);
        const manaPercent = Math.max(0, currentMana / maxMana);

        const barWidth = 200;
        const barHeight = 16;
        const barsX = x + 110;
        const hpY = y + 25;

        // Name above HP bar
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(pet.info.nickname ?? '', barsX, hpY - 6);

        // HP bar
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(barsX, hpY, barWidth, barHeight);

        ctx.fillStyle = hpPercent > 0.5 ? '#4CAF50' : hpPercent > 0.25 ? '#FF9800' : '#F44336';
        ctx.fillRect(barsX, hpY, barWidth * hpPercent, barHeight);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${currentHp}/${maxHp}`, barsX + barWidth - 5, hpY + 12);
        ctx.textAlign = 'left';

        // Mana bar
        const manaY = y + 50;

        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(barsX, manaY, barWidth, barHeight);

        ctx.fillStyle = '#2196F3';
        ctx.fillRect(barsX, manaY, barWidth * manaPercent, barHeight);

        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'right';
        ctx.fillText(`${currentMana}/${maxMana}`, barsX + barWidth - 5, manaY + 12);
        ctx.textAlign = 'left';

        // Draw stats
        const statsY = y + 80;
        const stats = [
            { label: 'AD', value: pet.stats.currentStats.ad, color: '#FF6B6B' },
            { label: 'AP', value: pet.stats.currentStats.ap, color: '#96CEB4' },
            { label: 'AR', value: pet.stats.currentStats.ar, color: '#4ECDC4' },
            { label: 'MR', value: pet.stats.currentStats.mr, color: '#45B7D1' },
        ];

        ctx.font = '11px Arial';
        for (let j = 0; j < stats.length; j++) {
            const statX = barsX + (j * 50);
            const stat = stats[j];

            ctx.fillStyle = stat.color;
            ctx.fillText(stat.label, statX, statsY);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(`${stat.value}`, statX, statsY + 15);
        }
    }

    // Draw team B pets
    for (let i = 0; i < teamLength.teamB; i++) {
        const pet = teamB[i];
        
        // Pet card drawing logic cho team B
        const startY = 50;
        const spacing = 140;
        const teamBX = 400;
        
        const x = teamBX;
        const y = startY + (i * spacing);
        
        const cardWidth = 350;
        const cardHeight = 120;

        // Draw card background
        ctx.fillStyle = '#3A3A3A';
        ctx.strokeStyle = '#5A5A5A';
        ctx.lineWidth = 2;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, cardWidth, cardHeight, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Draw pet avatar
        try {
            const petImage = await loadImage(pet.info.avatar);
            const avatarSize = 80;

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x + 10, y + 20, avatarSize, avatarSize, 8);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(petImage, x + 10, y + 20, avatarSize, avatarSize);
            ctx.restore();
        } catch (error) {
            console.error('Error drawing pet card:', error);
        }

        // Draw HP and Mana bars
        const currentHp = pet.stats.currentStats.hp;
        const maxHp = pet.stats.originalStats.hp;
        const currentMana = pet.stats.currentStats.mana;
        const maxMana = pet.stats.originalStats.mana;
        const hpPercent = Math.max(0, currentHp / maxHp);
        const manaPercent = Math.max(0, currentMana / maxMana);

        const barWidth = 200;
        const barHeight = 16;
        const barsX = x + 110;
        const hpY = y + 25;

        // Name above HP bar
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(pet.info.nickname ?? '', barsX, hpY - 6);

        // HP bar
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(barsX, hpY, barWidth, barHeight);
        
        ctx.fillStyle = hpPercent > 0.5 ? '#4CAF50' : hpPercent > 0.25 ? '#FF9800' : '#F44336';
        ctx.fillRect(barsX, hpY, barWidth * hpPercent, barHeight);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${currentHp}/${maxHp}`, barsX + barWidth - 5, hpY + 12);
        ctx.textAlign = 'left';

        // Mana bar
        const manaY = y + 50;

        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(barsX, manaY, barWidth, barHeight);

        ctx.fillStyle = '#2196F3';
        ctx.fillRect(barsX, manaY, barWidth * manaPercent, barHeight);

        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'right';
        ctx.fillText(`${currentMana}/${maxMana}`, barsX + barWidth - 5, manaY + 12);
        ctx.textAlign = 'left';

        // Draw stats
        const statsY = y + 80;
        const stats = [
            { label: 'AD', value: pet.stats.currentStats.ad, color: '#FF6B6B' },
            { label: 'AP', value: pet.stats.currentStats.ap, color: '#96CEB4' },
            { label: 'AR', value: pet.stats.currentStats.ar, color: '#4ECDC4' },
            { label: 'MR', value: pet.stats.currentStats.mr, color: '#45B7D1' },
        ];

        ctx.font = '11px Arial';
        for (let j = 0; j < stats.length; j++) {
            const statX = barsX + (j * 50);
            const stat = stats[j];

            ctx.fillStyle = stat.color;
            ctx.fillText(stat.label, statX, statsY);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(`${stat.value}`, statX, statsY + 15);
        }
    }

    return canvas.toBuffer('image/jpeg');
}

export async function createBattleImage() {
    const battleData = {
        teamA: [
            {
                info: {
                    nickname: "gdeer",
                    avatar: "https://gdeer.png",
                    isAlive: true,
                    level: 24,
                    autoAttack: {
                        damage: 100,
                        attackType: "Physical",
                        attackPosition: "Nearest"
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 150,
                        manaCost: 50,
                        attackType: "Physical",
                        attackPosition: "All",
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 644,
                        mana: 300,
                        ad: 124,
                        ap: 50,
                        ar: 34,
                        mr: 34
                    },
                    currentStats: {
                        hp: 343, // Current HP
                        mana: 180,
                        ad: 124,
                        ap: 50,
                        ar: 34,
                        mr: 34
                    }
                },
                effects: []
            },
            // Pet 2 - deagle  
            {
                info: {
                    nickname: "deagle",
                    avatar: "https://gdeer.png",
                    isAlive: true,
                    level: 24,
                    autoAttack: {
                        damage: 120,
                        attackType: "Physical",
                        attackPosition: "Random"
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 180,
                        manaCost: 60,
                        attackType: "Physical",
                        attackPosition: "Highest",
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 596,
                        mana: 250,
                        ad: 142,
                        ap: 40,
                        ar: 44,
                        mr: 44
                    },
                    currentStats: {
                        hp: 596,
                        mana: 134,
                        ad: 142,
                        ap: 40,
                        ar: 44,
                        mr: 44
                    }
                },
                effects: []
            },
            // Pet 3 - dboat
            {
                info: {
                    nickname: "dboat",
                    avatar: "https://gdeer.png",
                    isAlive: true,
                    level: 24,
                    autoAttack: {
                        damage: 90,
                        attackType: "Magical",
                        attackPosition: "All"
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 200,
                        manaCost: 80,
                        attackType: "Magical",
                        attackPosition: "All",
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 836,
                        mana: 400,
                        ad: 80,
                        ap: 220,
                        ar: 44,
                        mr: 44
                    },
                    currentStats: {
                        hp: 597,
                        mana: 292,
                        ad: 80,
                        ap: 220,
                        ar: 44,
                        mr: 44
                    }
                },
                effects: []
            }
        ] as IFPet[], 
        teamB: [
            // Enemy pets với stats tương tự...
        ] as IFPet[]
    };

    try {
        const imageBuffer = await renderBattleCanvas(battleData.teamA, battleData.teamB);

        // Tạo folder tempimage nếu chưa có
        const tempDir = path.join(process.cwd(), 'tempimage');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Tạo tên file với timestamp để tránh trùng lặp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `battle-result-${timestamp}.png`;
        const filepath = path.join(tempDir, filename);

        // Lưu file
        fs.writeFileSync(filepath, imageBuffer);

        console.log(`✅ Battle image đã được lưu tại: ${filepath}`);

        return {
            buffer: imageBuffer,
            filepath: filepath,
            filename: filename
        };
    } catch (error) {
        console.error('❌ Lỗi khi render battle canvas:', error);
        throw error;
    }
}
