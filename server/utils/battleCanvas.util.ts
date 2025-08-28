import { CanvasRenderingContext2D, createCanvas, loadImage } from 'canvas';
import { IFPet } from '@/constants/Type';
import * as fs from 'fs';
import * as path from 'path';

const drawTeamPets = async (
    ctx: CanvasRenderingContext2D,
    team: IFPet[],
    teamX: number
): Promise<void> => {
    const startY = 50;
    const spacing = 140;
    const maxPets = Math.min(team.length, 3);

    for (let i = 0; i < maxPets; i++) {
        const pet = team[i];
        
        const x = teamX;
        const y = startY + (i * spacing);
        
        const cardWidth = 350;
        const cardHeight = 120;
        
        const barWidth = 200;
        const barHeight = 16;
        const barsX = x + 110;
        const hpY = y + 25;

        const manaY = y + 50;
        const statsY = y + 80;

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

        // Name 
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
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(barsX, manaY, barWidth, barHeight);

        ctx.fillStyle = '#2196F3';
        ctx.fillRect(barsX, manaY, barWidth * manaPercent, barHeight);

        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'right';
        ctx.fillText(`${currentMana}/${maxMana}`, barsX + barWidth - 5, manaY + 12);
        ctx.textAlign = 'left';

        // Draw stats
        const stats = [
            { label: 'AD', value: pet.stats.currentStats.ad, color: '#FF6B6B' },
            { label: 'AP', value: pet.stats.currentStats.ap, color: '#96CEB4' },
            { label: 'AR', value: pet.stats.currentStats.ar, color: '#4ECDC4' },
            { label: 'MR', value: pet.stats.currentStats.mr, color: '#45B7D1' },
        ];
        const statsLength = stats.length;

        ctx.font = '11px Arial';
        for (let j = 0; j < statsLength; j++) {
            const statX = barsX + (j * 50);
            const stat = stats[j];

            ctx.fillStyle = stat.color;
            ctx.fillText(stat.label, statX, statsY);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(`${stat.value}`, statX, statsY + 15);
        }
    }
};

const renderBattleCanvas = async (teamA: IFPet[], teamB: IFPet[]): Promise<Buffer> => {
    const width = 800;
    const height = 600;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2C2F33';
    ctx.fillRect(0, 0, width, height);
    await drawTeamPets(ctx, teamA, 50); 
    await drawTeamPets(ctx, teamB, 400);

    return canvas.toBuffer('image/jpeg');
};

export async function createBattleImage() {
    const battleData = {
        teamA: [
            {
                position: 1,
                isAlive: true,
                info: {
                    nickname: "FireDragon",
                    avatar: "https://i.imgur.com/ZjKQYzI.jpg", // Ảnh rồng lửa
                    level: 25,
                    autoAttack: {
                        damage: 120,
                        attackType: "Physical" as any,
                        attackPosition: "Nearest" as any
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 200,
                        manaCost: 60,
                        attackType: "Physical" as any,
                        attackPosition: "All" as any,
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 850,
                        mana: 300,
                        ad: 150,
                        ap: 80,
                        ar: 45,
                        mr: 40
                    },
                    currentStats: {
                        hp: 650, // 76% HP
                        mana: 180,
                        ad: 150,
                        ap: 80,
                        ar: 45,
                        mr: 40
                    }
                },
                effects: []
            },
            {
                position: 3,
                isAlive: true,
                info: {
                    nickname: "IceWizard",
                    avatar: "https://i.imgur.com/P8KQrZm.jpg", // Ảnh pháp sư băng
                    level: 23,
                    autoAttack: {
                        damage: 80,
                        attackType: "Magical" as any,
                        attackPosition: "Random" as any
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 180,
                        manaCost: 70,
                        attackType: "Magical" as any,
                        attackPosition: "All" as any,
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 620,
                        mana: 450,
                        ad: 60,
                        ap: 200,
                        ar: 30,
                        mr: 60
                    },
                    currentStats: {
                        hp: 420, // 68% HP
                        mana: 280,
                        ad: 60,
                        ap: 200,
                        ar: 30,
                        mr: 60
                    }
                },
                effects: []
            },
            {
                position: 5,
                isAlive: true,
                info: {
                    nickname: "SteelKnight",
                    avatar: "https://i.imgur.com/8kLQzYm.jpg", // Ảnh hiệp sĩ thép
                    level: 26,
                    autoAttack: {
                        damage: 100,
                        attackType: "Physical" as any,
                        attackPosition: "Nearest" as any
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 160,
                        manaCost: 50,
                        attackType: "Physical" as any,
                        attackPosition: "Highest" as any,
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 950,
                        mana: 250,
                        ad: 130,
                        ap: 40,
                        ar: 80,
                        mr: 50
                    },
                    currentStats: {
                        hp: 950, // 100% HP (tank)
                        mana: 200,
                        ad: 130,
                        ap: 40,
                        ar: 80,
                        mr: 50
                    }
                },
                effects: []
            }
        ] as IFPet[], 
        teamB: [
            {
                position: 2,
                isAlive: true,
                info: {
                    nickname: "ShadowAssassin",
                    avatar: "https://i.imgur.com/QzKJYmI.jpg", // Ảnh sát thủ bóng tối
                    level: 24,
                    autoAttack: {
                        damage: 140,
                        attackType: "Physical" as any,
                        attackPosition: "Lowest" as any
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 220,
                        manaCost: 80,
                        attackType: "Physical" as any,
                        attackPosition: "Lowest" as any,
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 600,
                        mana: 320,
                        ad: 180,
                        ap: 50,
                        ar: 35,
                        mr: 30
                    },
                    currentStats: {
                        hp: 180, // 30% HP (nguy hiểm)
                        mana: 160,
                        ad: 180,
                        ap: 50,
                        ar: 35,
                        mr: 30
                    }
                },
                effects: []
            },
            {
                position: 4,
                isAlive: true,
                info: {
                    nickname: "StormMage",
                    avatar: "https://i.imgur.com/MzKJYgI.jpg", // Ảnh pháp sư bão
                    level: 25,
                    autoAttack: {
                        damage: 90,
                        attackType: "Magical" as any,
                        attackPosition: "All" as any
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 250,
                        manaCost: 100,
                        attackType: "Magical" as any,
                        attackPosition: "All" as any,
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 550,
                        mana: 500,
                        ad: 40,
                        ap: 250,
                        ar: 25,
                        mr: 70
                    },
                    currentStats: {
                        hp: 550, // 100% HP
                        mana: 300,
                        ad: 40,
                        ap: 250,
                        ar: 25,
                        mr: 70
                    }
                },
                effects: []
            },
            {
                position: 6,
                isAlive: false, // Pet đã chết
                info: {
                    nickname: "EarthGolem",
                    avatar: "https://i.imgur.com/VzKJYpI.jpg", // Ảnh golem đất
                    level: 22,
                    autoAttack: {
                        damage: 110,
                        attackType: "Physical" as any,
                        attackPosition: "Nearest" as any
                    },
                    passiveSkill: {},
                    activeSkill: {
                        damage: 170,
                        manaCost: 60,
                        attackType: "Physical" as any,
                        attackPosition: "All" as any,
                        effects: []
                    }
                },
                stats: {
                    originalStats: {
                        hp: 800,
                        mana: 200,
                        ad: 120,
                        ap: 30,
                        ar: 70,
                        mr: 40
                    },
                    currentStats: {
                        hp: 0, // Đã chết
                        mana: 0,
                        ad: 120,
                        ap: 30,
                        ar: 70,
                        mr: 40
                    }
                },
                effects: []
            }
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
