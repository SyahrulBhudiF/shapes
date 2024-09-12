-- CreateEnum
CREATE TYPE "ShapeType" AS ENUM ('BangunDatar', 'BangunRuang');

-- CreateEnum
CREATE TYPE "FormulaType" AS ENUM ('Luas', 'Volume');

-- CreateEnum
CREATE TYPE "ShapeName" AS ENUM ('Persegi', 'Lingkaran', 'Segitiga', 'Balok', 'Kubus', 'Tabung');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shape" (
    "id" SERIAL NOT NULL,
    "shapeName" "ShapeName" NOT NULL,
    "type" "ShapeType" NOT NULL,
    "formula" TEXT NOT NULL,
    "parameters" TEXT NOT NULL,
    "formulaType" "FormulaType" NOT NULL,

    CONSTRAINT "Shape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shapeId" INTEGER NOT NULL,
    "parameters" JSONB NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_shapeId_fkey" FOREIGN KEY ("shapeId") REFERENCES "Shape"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
