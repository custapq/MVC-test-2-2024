const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ฟังก์ชันสุ่มเลข 6 หลัก ห้าม 0 นำหน้า
function generateCostumeId() {
  let id;
  do {
    id = Math.floor(100000 + Math.random() * 900000); // เลข 6 หลัก ห้าม 0 นำหน้า
  } while (id.toString().charAt(0) === "0");
  return id;
}

// ฟังก์ชันสุ่มค่า durability และ costumeTypeId
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // ลบข้อมูลเก่าก่อน
  await prisma.costume.deleteMany();

  const costumes = Array.from({ length: 100 }, () => ({
    Id: generateCostumeId(),
    costumeTypeId: getRandomInt(1, 3), // สุ่ม 1 - 3
    durability: getRandomInt(0, 100), // สุ่ม 0 - 100
    isRepaired: false, // เพิ่มค่าเริ่มต้นเป็น false
  }));

  // เพิ่มข้อมูล
  await prisma.costume.createMany({ data: costumes });

  console.log("Seeding 100 Costumes complete!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
