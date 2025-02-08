const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// route สำหรับ api user
router.get("/api/users", userController.getUsers);
router.get("/api/user/:id", userController.getUser);
router.post("/api/user", userController.addUser);
router.put("/api/user/:id", userController.updateUser);

// route สำหรับ view user
router.get("/users", async (req, res) => {
  try {
    const users = await userController.getUsersData();
    console.log("get users :", users);
    res.render("users", { users });
  } catch (error) {
    res.status(500).send("Error loading users");
  }
});
module.exports = router;
