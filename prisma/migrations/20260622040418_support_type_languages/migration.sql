/*
  Warnings:

  - The primary key for the `sde_blueprint_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `activity` to the `sde_blueprint_materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity` to the `sde_blueprint_products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `sde_types` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "sde_blueprint_materials" ADD COLUMN     "activity" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sde_blueprint_products" DROP CONSTRAINT "sde_blueprint_products_pkey",
ADD COLUMN     "activity" TEXT NOT NULL,
ADD CONSTRAINT "sde_blueprint_products_pkey" PRIMARY KEY ("blueprint_id", "product_id", "activity");

-- AlterTable
ALTER TABLE "sde_types" DROP COLUMN "name",
ADD COLUMN     "name" JSONB NOT NULL;
