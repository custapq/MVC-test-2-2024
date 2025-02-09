const express = require("express");
const router = express.Router();
const costumeController = require("../controllers/costumeController");

// route สำหรับ api costume
router.get("/api/costumes", costumeController.getCostumes); //เรียกข้อมูลชุดทั้งหมด
router.get("/api/costume/:id", costumeController.getCostume); //เรียกข้อมูลชุดตาม id
router.get("/api/repairCount/", costumeController.getRepairCount); //เรียกข้อมูลชุดที่ซ่อมแล้วแบ่งตามประเภทชุด
router.put("/api/repair/:id", costumeController.repairCostume); //อัปเดทโดยซ่อมชุดตาม id

// route สำหรับ view costume
router.get("/", costumeController.getViewCostume);

module.exports = router;
