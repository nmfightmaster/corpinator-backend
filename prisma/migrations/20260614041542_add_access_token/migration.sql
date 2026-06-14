/*
  Warnings:

  - Added the required column `access_token` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" ADD COLUMN "access_token" TEXT NOT NULL DEFAULT '';

ALTER TABLE "characters" ALTER COLUMN "access_token" DROP DEFAULT;
