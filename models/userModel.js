const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUsers() { //ดึงข้อมูล user ทั้งหมด
  return await prisma.user.findMany();
}

async function getUser(id) { //ดึงข้อมูล user ตาม id
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
}

async function createUser(name, age) { //สร้างข้อมูล user
  return await prisma.user.create({
    data: { name, age },
  });
}

async function updateUser(id, name, age) { //อัพเดทข้อมูล user
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, age },
  });
}

module.exports = { getUsers, createUser, getUser, updateUser };
