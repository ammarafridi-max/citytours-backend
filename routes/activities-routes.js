const express = require("express");
const router = express.Router();
const ActivityModel = require("../models/ActivityModel");

router.get("/", (req, res) => {
  ActivityModel.find()
    .then((activities) => {
      res.json(activities);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving activities" });
    });
});

router.get("/:url", (req, res) => {
  const url = req.params.url;
  ActivityModel.findOne({ url: url })
    .then((activity) => {
      res.json(activity);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving activity" });
    });
});

router.get("/:url/booking", (req, res) => {
  const url = req.params.url;
  ActivityModel.findOne({ url: url })
    .then((activity) => {
      res.json(activity);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving activity" });
    });
});

module.exports = router;
