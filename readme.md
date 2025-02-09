ข้อที่ 2 การสอบ MVC

เครื่องมือที่ใช้ express.js 
prisma orm ที่เชื่อมต่อกับ postgresql เพื่อจัดการเกี่ยวกับ Database โดยมี schema.prisma ที่ใช้ในการกำหนดโครงสร้าง database และ seeds ต่างๆที่ใช้ generate data 
ejs view engine สำหรับแสดง  View โดยการสร้าง html ที่มีการแสดงผลข้อมูลของ Model ที่ส่งผ่านจาก Controller 

โดยมีไฟล์หลักๆดังนี้

costumeController.js
เป็นตัว Controller ที่ใช้จัดการทำงานระหว่าง Model และ View โดยมี function ต่างๆเช่น getCostume ที่มีการตรวจสอบความถูกต้องของข้อมูลที่ได้รับ

costumeModel.js
เป็น Model ที่ใช้จัดการเกี่ยวกับการเข้าถึง Database โดยผ่านคำสั่งของ Prisma ORM เพื่อดึงข้อมูลมาแสดงหรืออัปเดทข้อมูล

costumeRoute.js
เป็นตัวกำหนด path ของ api ที่รอรับ request และ path ที่สำหรับแสดงผลหน้า View

layout.ejs เป็นหน้าหลักของ View ที่ใช้แสดงผลข้อมูล ที่ประกอบด้วย costume.ejs  ที่แสดงข้อมูลของ costume และการจัดการต่างๆเช่น การกดปุ่มซ่อม เพื่อเพิ่มความคงทน แล้วเป็นการอัปเดทตารางแสดงจำนวนชุดที่ถูกซ่อมแล้วใน layout.ejs

การทำงานคือให้ผู้ใช้ป้อน code ของชุดที่ต้องการตรวจสอบ เมื่อค้นหาจะไปเรียก API ที่ส่งไปยัง Controller เพื่อนำข้อมูลของชุดจาก Model เมื่อ Controller นำข้อมูลมาประมวลผลแล้วก็จะส่งมาแสดงทาง View