const costumeModel = require("../models/costumeModel");

async function getCostumes(req, res) { //ดึงข้อมูลชุดทั้งหมด
  try {
    const costume = await costumeModel.getCostumes();
    console.log("get users :", costume);
    res.json(costume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getCostume(req, res) { //ดึงข้อมูลชุดตาม id
  try {
    const { id } = req.params;
    if (!/^[1-9][0-9]{5}$/.test(id)) { //ตรวจสอบความถูกต้องของ id
      return res
        .status(400)
        .json({ error: "code ต้อง 6 หลักและห้ามขึ้นต้นด้วย 0" });
    }

    const costume = await costumeModel.getCostume(id);

    if (!costume) {
      return res.status(404).json({ error: "costume not found" });
    }

    console.log("get costume:", costume);
    res.json(costume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getViewCostume(req, res) { //แสดงหน้า view costume
  try {
    const repairedCostumes = await costumeModel.getRepairedCostumeCountByType();
    res.render("costume", { repairedCostumes });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function repairCostume(req, res) { //ซ่อมชุดตาม id
  try {
    const { id } = req.params;
    const updatedCostume = await costumeModel.repairCostume(id);
    res.json({ message: "repaired", costume: updatedCostume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in repair" });
  }
}

async function getRepairCount(req, res) { //ดึงข้อมูลชุดที่ซ่อมแล้วแบ่งตามประเภทชุด
  try {
    const repairedCount = await costumeModel.getRepairedCostumeCountByType();
    res.json(repairedCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getCostumes,
  getCostume,
  getRepairCount,
  getViewCostume,
  repairCostume,
};
