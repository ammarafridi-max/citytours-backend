const express = require("express");
const router = express.Router();
const RoleModel = require("../models/RoleModel");

router.get("/", async (req, res) => {
  const data = await RoleModel.find();
  res
    .status(200)
    .json({ message: "Roles found successfully", results: data.length, data });
});

router.post("/create", async (req, res) => {
  const roleData = req.body;

  if (await RoleModel.findOne({ name: roleData.name })) {
    return res
      .status(409)
      .send({ message: "Role with the same name already exists" });
  }

  // Proceed to adding the new role
  const response = await RoleModel.create(roleData);
  console.log(response);
  res.status(200).json({ message: "Role added successfully" });
});

module.exports = router;
