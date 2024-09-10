const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cloudinary = require("cloudinary").v2;

router.get("/", async (req, res) => {
  const users = await UserModel.find();
  if (!users.length)
    return res.status(404).json({ message: "Users not found" });
  res.status(200).json({
    message: "User data fetched successfully",
    results: users.length,
    data: users,
  });
});

router.post("/add", async (req, res) => {
  const newUser = req.body;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  newUser.password = hashedPassword;
  console.log(`New user with hashed password: `, newUser);

  UserModel.create(newUser).then(() =>
    res.status(200).json({ message: "User added successfully" })
  );
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res
      .status(401)
      .json({ status: "failed", message: "Wrong password" });
  res.status(200).json({
    status: "success",
    message: "Authentication successful",
    data: user,
  });
});

router.get("/get/:username", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User found", data: user });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:username", async (req, res) => {
  const username = req.params.username;
  const userData = req.body;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  userData.password = hashedPassword;
  console.log(`New user with hashed password: `, userData);

  UserModel.findOneAndUpdate(
    { username: username },
    { password: hashedPassword }
  ).then(() => res.status(200).json({ message: "User updated successfully" }));
});

router.delete("/delete/:username", async (req, res) => {
  try {
    const username = req.params.username;
    await UserModel.findOneAndDelete({ username });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
