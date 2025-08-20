/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mezon_emoji_id]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Rarity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mezon_emoji_id]` on the table `Rarity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserPet" ALTER COLUMN "additional_hp" SET DEFAULT 0,
ALTER COLUMN "additional_mana" SET DEFAULT 0,
ALTER COLUMN "additional_ad" SET DEFAULT 0,
ALTER COLUMN "additional_ap" SET DEFAULT 0,
ALTER COLUMN "additional_ar" SET DEFAULT 0,
ALTER COLUMN "additional_mr" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Pet_name_key" ON "Pet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_mezon_emoji_id_key" ON "Pet"("mezon_emoji_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_name_key" ON "Rarity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_mezon_emoji_id_key" ON "Rarity"("mezon_emoji_id");
