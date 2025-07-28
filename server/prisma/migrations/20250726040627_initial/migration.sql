-- CreateEnum
CREATE TYPE "EAttackType" AS ENUM ('Physical', 'Magical');

-- CreateEnum
CREATE TYPE "EPetRole" AS ENUM ('Tank', 'Mage', 'Support', 'Assassin', 'Warrior');

-- CreateEnum
CREATE TYPE "EElemental" AS ENUM ('Metal', 'Wood', 'Water', 'Fire', 'Earth');

-- CreateEnum
CREATE TYPE "ERarity" AS ENUM ('Uncommon', 'Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Limited');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "mezon_id" TEXT NOT NULL,
    "z_coin" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" TEXT NOT NULL,
    "type" "ERarity" NOT NULL,
    "catch_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
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
    "mana_to_cast" INTEGER NOT NULL,
    "hp_per_level" INTEGER NOT NULL,
    "ad_per_level" INTEGER NOT NULL,
    "ap_per_level" INTEGER NOT NULL,
    "ar_per_level" INTEGER NOT NULL,
    "mr_per_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "statistic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPet" (
    "id" TEXT NOT NULL,
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
    "is_lock" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "UserPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "user_pet_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" TEXT NOT NULL,
    "team_a_id" TEXT NOT NULL,
    "team_b_id" TEXT NOT NULL,
    "winner_team_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_mezon_id_key" ON "User"("mezon_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_type_key" ON "Rarity"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_type_key" ON "Statistics"("type");

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_rarity_fkey" FOREIGN KEY ("rarity") REFERENCES "Rarity"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_statistic_fkey" FOREIGN KEY ("statistic") REFERENCES "Statistics"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

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
