/*
  Warnings:

  - You are about to drop the column `createdAt` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `refresh_token` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_characterId_fkey";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "createdAt",
DROP COLUMN "refreshToken",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refresh_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "characterId",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
ADD COLUMN     "character_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
