import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ลบข้อมูลเก่า
  await prisma.costume.deleteMany();
  await prisma.costumeType.deleteMany();

  // สร้าง CostumeType
  const powerful = await prisma.costumeType.create({
    data: { name: "ทรงพลัง" },
  });

  const stealth = await prisma.costumeType.create({
    data: { name: "ลอบเร้น" },
  });

  const disguise = await prisma.costumeType.create({
    data: { name: "ปกปิดตัวตน" },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });