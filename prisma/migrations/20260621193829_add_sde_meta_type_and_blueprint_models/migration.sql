-- CreateTable
CREATE TABLE "sde_meta" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "build_number" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sde_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sde_types" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,
    "portion_size" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL,
    "volume" DOUBLE PRECISION,
    "base_price" DOUBLE PRECISION,
    "market_group_id" INTEGER,
    "meta_group_id" INTEGER,

    CONSTRAINT "sde_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sde_blueprints" (
    "blueprint_id" INTEGER NOT NULL,
    "max_production_limit" INTEGER NOT NULL,
    "copying_time" INTEGER,
    "manufacturing_time" INTEGER,
    "me_research_time" INTEGER,
    "te_research_time" INTEGER,

    CONSTRAINT "sde_blueprints_pkey" PRIMARY KEY ("blueprint_id")
);

-- CreateTable
CREATE TABLE "sde_blueprint_materials" (
    "material_id" INTEGER NOT NULL,
    "blueprint_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "sde_blueprint_materials_pkey" PRIMARY KEY ("blueprint_id","material_id")
);

-- CreateTable
CREATE TABLE "sde_blueprint_products" (
    "product_id" INTEGER NOT NULL,
    "blueprint_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "sde_blueprint_products_pkey" PRIMARY KEY ("blueprint_id","product_id")
);

-- AddForeignKey
ALTER TABLE "sde_blueprint_materials" ADD CONSTRAINT "sde_blueprint_materials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "sde_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sde_blueprint_materials" ADD CONSTRAINT "sde_blueprint_materials_blueprint_id_fkey" FOREIGN KEY ("blueprint_id") REFERENCES "sde_blueprints"("blueprint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sde_blueprint_products" ADD CONSTRAINT "sde_blueprint_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "sde_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sde_blueprint_products" ADD CONSTRAINT "sde_blueprint_products_blueprint_id_fkey" FOREIGN KEY ("blueprint_id") REFERENCES "sde_blueprints"("blueprint_id") ON DELETE RESTRICT ON UPDATE CASCADE;
