/*
  Warnings:

  - The values [Balok] on the enum `ShapeName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ShapeName_new" AS ENUM ('Persegi', 'Lingkaran', 'Segitiga', 'Limas', 'Kubus', 'Tabung');
ALTER TABLE "Shape" ALTER COLUMN "shapeName" TYPE "ShapeName_new" USING ("shapeName"::text::"ShapeName_new");
ALTER TYPE "ShapeName" RENAME TO "ShapeName_old";
ALTER TYPE "ShapeName_new" RENAME TO "ShapeName";
DROP TYPE "ShapeName_old";
COMMIT;
