const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getCostume(id) {
  //ดึงข้อมูลชุดตาม id
  return await prisma.costume.findUnique({
    where: { Id: parseInt(id) },
    include: {
      costumeType: true,
    },
  });
}

async function getCostumes() {
  //ดึงข้อมูล costume ทั้งหมด
  return await prisma.costume.findMany({
    include: {
      costumeType: true,
    },
  });
}

async function updateCostume(id, durability) {
  //อัพเดทข้อมูล costume
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { durability: parseInt(durability) },
  });
}

async function getRepairedCostumeCountByType() {
  //ดึงข้อมูลชุดที่ซ่อมแล้วแบ่งตามประเภทชุด
  const results = await prisma.costume.groupBy({
    //ใช้  count เพื่อนับจำนวน
    by: ["costumeTypeId"],
    where: {
      isRepaired: true,
    },
    _count: {
      costumeTypeId: true,
    },
  });

  const costumeTypeNames = await prisma.costumeType.findMany({
    //ดึงข้อมูลเพื่อนำชื่อของประเภทชุดไปแสดง
    where: {
      id: { in: results.map((r) => r.costumeTypeId) },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return results.map((row) => {
    // map ข้อมูลที่ต้องการนำไปแสดง
    const costumeType = costumeTypeNames.find(
      (ct) => ct.id === row.costumeTypeId
    );
    return {
      costumeTypeId: row.costumeTypeId, // id ของชุดแต่ละประเภท
      costumeTypeName: costumeType.name, // ชื่อของชุดแต่ละประเภท
      count: row._count.costumeTypeId, // จำนวนชุดที่ซ่อมแล้วแต่ละประเภท
    };
  });
}

async function repairCostume(id) {
  // update ข้อมูลชุดที่ซ่อมแล้ว
  let costume = await prisma.costume.findUnique({
    //ดึงข้อมูลชุดตาม id ที่จะซ่อม
    where: { Id: Number(id) },
  });
  const newDurability = Math.min(costume.durability + 25, 100); // คำนวณค่า durability ใหม่โดยไม่เกิน 100

  return await prisma.costume.update({
    // update ข้อมูลชุด
    where: { Id: Number(id) },
    data: {
      durability: newDurability,
      isRepaired: true,
    },
  });
}

async function updateCostumeReady(id, durability, costumeTypeId) {
  // อัพเดท isReady ของชุดว่าต้องซ่อมหรือไม่
  // console.log(costumeTypeId, durability);
  const isReady =
    (costumeTypeId === 1 && durability <= 70) ||
    (costumeTypeId === 2 && durability <= 50) ||
    (costumeTypeId === 3 && (durability % 10 === 3 || durability % 10 === 7));

  return await prisma.costume.update({
    where: { Id: Number(id) },
    data: {
      durability: parseInt(durability),
      isReady: isReady,
    },
  });
}

module.exports = {
  getCostume,
  updateCostume,
  getCostumes,
  getRepairedCostumeCountByType,
  repairCostume,
  updateCostumeReady,
};
