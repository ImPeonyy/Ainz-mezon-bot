/*
  Warnings:

  - You are about to drop the column `effect` on the `ActiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `effect_stat` on the `ActiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `effect_target` on the `ActiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `effect_target_count` on the `ActiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `effect_target_position` on the `ActiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `effect` on the `PassiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `effect_stat` on the `PassiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `effect_target` on the `PassiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `target_count` on the `PassiveSkill` table. All the data in the column will be lost.
  - You are about to drop the column `target_position` on the `PassiveSkill` table. All the data in the column will be lost.
  - Made the column `daily` on table `UserDailyActivities` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ESkillType" AS ENUM ('Passive', 'Active');

-- AlterTable
ALTER TABLE "ActiveSkill" DROP COLUMN "effect",
DROP COLUMN "effect_stat",
DROP COLUMN "effect_target",
DROP COLUMN "effect_target_count",
DROP COLUMN "effect_target_position",
ADD COLUMN     "damage" INTEGER,
ALTER COLUMN "attack_type" DROP NOT NULL,
ALTER COLUMN "attack_position" DROP NOT NULL,
ALTER COLUMN "attack_target_count" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PassiveSkill" DROP COLUMN "effect",
DROP COLUMN "effect_stat",
DROP COLUMN "effect_target",
DROP COLUMN "target_count",
DROP COLUMN "target_position";

-- AlterTable
ALTER TABLE "UserDailyActivities" ADD COLUMN     "hunt" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "daily" SET NOT NULL,
ALTER COLUMN "daily" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Effect" (
    "id" SERIAL NOT NULL,
    "skill_type" "ESkillType" NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "effect_target" "EEffectTarget" NOT NULL,
    "effect_target_position" "ETargetPosition" NOT NULL,
    "effect_target_count" INTEGER NOT NULL DEFAULT 1,
    "effect" "EEffect" NOT NULL,
    "effect_stat" "EStat",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);
