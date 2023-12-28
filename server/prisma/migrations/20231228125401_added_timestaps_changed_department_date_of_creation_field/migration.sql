/*
  Warnings:

  - You are about to drop the column `dateOfCreation` on the `Department` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Department" DROP COLUMN "dateOfCreation",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);
