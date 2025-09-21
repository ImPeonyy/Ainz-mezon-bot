-- CreateEnum
CREATE TYPE "public"."EScalingType" AS ENUM ('Physical', 'Magical', 'Hybrid');

-- CreateEnum
CREATE TYPE "public"."EPetRole" AS ENUM ('Tank', 'Mage', 'Support', 'Assassin', 'Warrior');

-- CreateEnum
CREATE TYPE "public"."EElemental" AS ENUM ('Metal', 'Wood', 'Water', 'Fire', 'Earth');

-- CreateEnum
CREATE TYPE "public"."ERarity" AS ENUM ('Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Limited');

-- CreateEnum
CREATE TYPE "public"."ETargetPosition" AS ENUM ('All', 'Random', 'Self', 'LowestHP', 'HighestHP', 'Nearest', 'Farthest');

-- CreateEnum
CREATE TYPE "public"."EEffectTarget" AS ENUM ('Ally', 'Enemy');

-- CreateEnum
CREATE TYPE "public"."EEffect" AS ENUM ('Heal', 'DOT', 'BuffStat', 'DebuffStat', 'RemoveBuff', 'RemoveDebuff', 'Silence', 'ReducedHealing', 'LifeSteal', 'Revive');

-- CreateEnum
CREATE TYPE "public"."EStat" AS ENUM ('Hp', 'Mana', 'Atk', 'Def');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "z_coin" INTEGER NOT NULL DEFAULT 0,
    "mezon_token" INTEGER NOT NULL DEFAULT 0,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/do2rk0jz8/image/upload/v1757571181/download_ygjzey.jpg',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserDailyActivities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "daily" INTEGER NOT NULL DEFAULT 0,
    "hunt" INTEGER NOT NULL DEFAULT 0,
    "battle" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDailyActivities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rarity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mezon_emoji_id" TEXT NOT NULL,
    "type" "public"."ERarity" NOT NULL,
    "catch_rate" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AutoAttack" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "damage" INTEGER NOT NULL,
    "scaling_type" "public"."EScalingType" NOT NULL,
    "attack_position" "public"."ETargetPosition" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AutoAttack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PassiveSkill" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PassiveSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActiveSkill" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "mana_cost" INTEGER NOT NULL,
    "scaling_type" "public"."EScalingType",
    "damage" INTEGER,
    "attack_position" "public"."ETargetPosition",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActiveSkillEffect" (
    "id" SERIAL NOT NULL,
    "active_skill_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "effect_target" "public"."EEffectTarget" NOT NULL,
    "effect_target_position" "public"."ETargetPosition" NOT NULL,
    "effect" "public"."EEffect" NOT NULL,
    "effect_stat" "public"."EStat",
    "scaling_type" "public"."EScalingType",
    "duration" INTEGER NOT NULL DEFAULT 1,
    "value" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveSkillEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PassiveSkillEffect" (
    "id" SERIAL NOT NULL,
    "passive_skill_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "effect_target" "public"."EEffectTarget" NOT NULL,
    "effect_target_position" "public"."ETargetPosition" NOT NULL,
    "effect" "public"."EEffect" NOT NULL,
    "effect_stat" "public"."EStat",
    "value" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PassiveSkillEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Statistics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scaling_type" "public"."EScalingType" NOT NULL,
    "role" "public"."EPetRole" NOT NULL,
    "element_type" "public"."EElemental",
    "rarity" "public"."ERarity" NOT NULL,
    "hp" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "ad" INTEGER NOT NULL,
    "ap" INTEGER NOT NULL,
    "ar" INTEGER NOT NULL,
    "mr" INTEGER NOT NULL,
    "hp_per_level" INTEGER NOT NULL,
    "ad_per_level" INTEGER NOT NULL,
    "ap_per_level" INTEGER NOT NULL,
    "ar_per_level" INTEGER NOT NULL,
    "mr_per_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mezon_emoji_id" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "description" TEXT,
    "statistic_id" INTEGER NOT NULL,
    "rarity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPet" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 1,
    "lock" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Team" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "combat_power" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeamMember" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "user_pet_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LeaderBoard" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "combat_power" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_name_key" ON "public"."Rarity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_mezon_emoji_id_key" ON "public"."Rarity"("mezon_emoji_id");

-- CreateIndex
CREATE UNIQUE INDEX "AutoAttack_pet_id_key" ON "public"."AutoAttack"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "PassiveSkill_pet_id_key" ON "public"."PassiveSkill"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveSkill_pet_id_key" ON "public"."ActiveSkill"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_name_key" ON "public"."Pet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_mezon_emoji_id_key" ON "public"."Pet"("mezon_emoji_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPet_user_id_pet_id_key" ON "public"."UserPet"("user_id", "pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPet_user_id_nickname_key" ON "public"."UserPet"("user_id", "nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Team_user_id_key" ON "public"."Team"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "public"."Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_user_pet_id_key" ON "public"."TeamMember"("user_pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_team_id_position_key" ON "public"."TeamMember"("team_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderBoard_userId_key" ON "public"."LeaderBoard"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserDailyActivities" ADD CONSTRAINT "UserDailyActivities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AutoAttack" ADD CONSTRAINT "AutoAttack_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PassiveSkill" ADD CONSTRAINT "PassiveSkill_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActiveSkill" ADD CONSTRAINT "ActiveSkill_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActiveSkillEffect" ADD CONSTRAINT "ActiveSkillEffect_active_skill_id_fkey" FOREIGN KEY ("active_skill_id") REFERENCES "public"."ActiveSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PassiveSkillEffect" ADD CONSTRAINT "PassiveSkillEffect_passive_skill_id_fkey" FOREIGN KEY ("passive_skill_id") REFERENCES "public"."PassiveSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_statistic_id_fkey" FOREIGN KEY ("statistic_id") REFERENCES "public"."Statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_rarity_id_fkey" FOREIGN KEY ("rarity_id") REFERENCES "public"."Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPet" ADD CONSTRAINT "UserPet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPet" ADD CONSTRAINT "UserPet_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamMember" ADD CONSTRAINT "TeamMember_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamMember" ADD CONSTRAINT "TeamMember_user_pet_id_fkey" FOREIGN KEY ("user_pet_id") REFERENCES "public"."UserPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaderBoard" ADD CONSTRAINT "LeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
