/*
  Warnings:

  - The primary key for the `sde_blueprint_materials` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "sde_blueprint_materials" DROP CONSTRAINT "sde_blueprint_materials_pkey",
ADD CONSTRAINT "sde_blueprint_materials_pkey" PRIMARY KEY ("blueprint_id", "material_id", "activity");
