/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Costume" (
    "Id" INTEGER NOT NULL,
    "costumeTypeId" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL,

    CONSTRAINT "Costume_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CostumeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CostumeType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Costume" ADD CONSTRAINT "Costume_costumeTypeId_fkey" FOREIGN KEY ("costumeTypeId") REFERENCES "CostumeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
