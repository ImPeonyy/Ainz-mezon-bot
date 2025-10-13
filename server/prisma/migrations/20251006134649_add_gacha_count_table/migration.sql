-- CreateTable
CREATE TABLE "public"."GachaCount" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "normal" INTEGER NOT NULL DEFAULT 0,
    "mid_autumn_2025" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GachaCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GachaCount_userId_key" ON "public"."GachaCount"("userId");

-- AddForeignKey
ALTER TABLE "public"."GachaCount" ADD CONSTRAINT "GachaCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
