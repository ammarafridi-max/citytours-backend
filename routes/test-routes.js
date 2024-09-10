const express = require("express");
const router = express.Router();

// Email templates

const bookingSuccessfulEmail = require("../email-templates/admin-templates");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
    data: "This is a test endpoint",
  });
});

router.post("/booking", (req, res) => {
  const data = req.body;

  res.status(200).json({
    message: "success",
    data,
  });

  bookingSuccessfulEmail();
});

module.exports = router;
