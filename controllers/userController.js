const userModel = require("../models/userModel");

async function getUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    console.log("get users :", users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUsersData() {
  try {
    return await userModel.getUsers();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.getUser(id);
    console.log("get user :", user);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addUser(req, res) {
  try {
    const { name, age } = req.body;
    const newUser = await userModel.createUser(name, age);
    console.log("add user :", newUser);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    const updatedUser = await userModel.updateUser(id, name, age);
    console.log("update user :", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getUsers, addUser, getUser, updateUser, getUsersData };
