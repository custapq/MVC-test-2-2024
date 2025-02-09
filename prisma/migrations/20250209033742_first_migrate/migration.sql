/*
  Warnings:

  - Added the required column `isRepaired` to the `Costume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Costume" ADD COLUMN     "isRepaired" BOOLEAN NOT NULL;
