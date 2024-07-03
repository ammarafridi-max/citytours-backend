const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/sign-up", (req, res) => {
  const formData = req.body;
  const newUser = new UserModel(formData);
  newUser
    .save()
    .then(() => {
      console.log("User registered successfully");
      res.status(200).json({ message: "User signed up successfully" });
    })
    .catch((error) => {
      console.log("Error entering data: " + error);
      res.status(500).json({ message: "Error signing up user" });
    });
});

module.exports = router;
