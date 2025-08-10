-- CreateEnum
CREATE TYPE "EAttackType" AS ENUM ('Physical', 'Magical');

-- CreateEnum
CREATE TYPE "EPetRole" AS ENUM ('Tank', 'Mage', 'Support', 'Assassin', 'Warrior');

-- CreateEnum
CREATE TYPE "EElemental" AS ENUM ('Metal', 'Wood', 'Water', 'Fire', 'Earth');

-- CreateEnum
CREATE TYPE "ERarity" AS ENUM ('Uncommon', 'Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Limited');

-- CreateEnum
CREATE TYPE "ETargetPosition" AS ENUM ('Front', 'Back', 'All', 'Random', 'Self', 'LowestHP', 'HighestHP', 'Nearest', 'Farthest');

-- CreateEnum
CREATE TYPE "EEffectTarget" AS ENUM ('Ally', 'Enemy');

-- CreateEnum
CREATE TYPE "EEffect" AS ENUM ('Heal', 'Burn', 'Poison', 'BuffStat', 'DebuffStat', 'RemoveBuff', 'RemoveDebuff');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "mezon_id" TEXT NOT NULL,
    "z_coin" INTEGER NOT NULL DEFAULT 0,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "avatar" TEXT NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmEu4YN6-g4qQAnwyk7fx0YF5QrVvPM8rAw&s',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDailyActivities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "daily" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDailyActivities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mezon_emoji_id" TEXT NOT NULL,
    "type" "ERarity",
    "catch_rate" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoAttack" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "damage" INTEGER NOT NULL,
    "attack_type" "EAttackType" NOT NULL,
    "attack_position" "ETargetPosition" NOT NULL,
    "target_count" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AutoAttack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassiveSkill" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "effect_target" "EEffectTarget" NOT NULL,
    "target_position" "ETargetPosition" NOT NULL,
    "target_count" INTEGER NOT NULL DEFAULT 1,
    "effect" "EEffect" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PassiveSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveSkill" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "mana_cost" INTEGER NOT NULL,
    "attack_type" "EAttackType" NOT NULL,
    "attack_position" "ETargetPosition" NOT NULL,
    "attack_target_count" INTEGER NOT NULL DEFAULT 1,
    "effect_target" "EEffectTarget",
    "effect_target_position" "ETargetPosition",
    "effect_target_count" INTEGER DEFAULT 1,
    "effect" "EEffect",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attack_type" "EAttackType" NOT NULL,
    "role" "EPetRole" NOT NULL,
    "element_type" "EElemental",
    "rarity" "ERarity" NOT NULL,
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
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mezon_emoji_id" TEXT NOT NULL,
    "description" TEXT,
    "statistic_id" INTEGER NOT NULL,
    "rarity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPet" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "nickname" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "additional_hp" INTEGER NOT NULL,
    "additional_mana" INTEGER NOT NULL,
    "additional_ad" INTEGER NOT NULL,
    "additional_ap" INTEGER NOT NULL,
    "additional_ar" INTEGER NOT NULL,
    "additional_mr" INTEGER NOT NULL,
    "lock" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "user_pet_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" SERIAL NOT NULL,
    "team_a_id" INTEGER NOT NULL,
    "team_b_id" INTEGER NOT NULL,
    "winner_team_id" INTEGER NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_mezon_id_key" ON "User"("mezon_id");

-- CreateIndex
CREATE UNIQUE INDEX "AutoAttack_pet_id_key" ON "AutoAttack"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "PassiveSkill_pet_id_key" ON "PassiveSkill"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveSkill_pet_id_key" ON "ActiveSkill"("pet_id");

-- AddForeignKey
ALTER TABLE "UserDailyActivities" ADD CONSTRAINT "UserDailyActivities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoAttack" ADD CONSTRAINT "AutoAttack_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassiveSkill" ADD CONSTRAINT "PassiveSkill_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveSkill" ADD CONSTRAINT "ActiveSkill_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_statistic_id_fkey" FOREIGN KEY ("statistic_id") REFERENCES "Statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_rarity_id_fkey" FOREIGN KEY ("rarity_id") REFERENCES "Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPet" ADD CONSTRAINT "UserPet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPet" ADD CONSTRAINT "UserPet_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_user_pet_id_fkey" FOREIGN KEY ("user_pet_id") REFERENCES "UserPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_team_a_id_fkey" FOREIGN KEY ("team_a_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_team_b_id_fkey" FOREIGN KEY ("team_b_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_winner_team_id_fkey" FOREIGN KEY ("winner_team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
