const express = require("express");
const router = express.Router();
const DestinationModel = require("../models/DestinationModel");

// Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await DestinationModel.find({});
    res.send(destinations);
  } catch (error) {
    res.send({ message: "Error retrieving destinations from DB" });
  }
});

// Get one destination
router.get("/get/:url", async (req, res) => {
  try {
    const { url } = await req.body.params;
    const destination = await DestinationModel.findOne({ url });
    if (!destination)
      return res.status(404).send({ message: "Destination not found" });
    res.status(200).send(destination);
  } catch (error) {
    console.error(`Error: ${error}`);
    res
      .status(500)
      .send({ message: "An error occurred while retrieving the blog" });
  }
});

// Add a destination
router.post("/add", async (req, res) => {
  try {
    // 1. Retrieve Data
    const destination = {
      name: req.body.name,
      url: req.body.url,
      image: req.body.image,
      description: req.body.description,
    };

    console.log(destination);

    // 2. Check if a blog with the same URL already exists
    if (await DestinationModel.findOne({ url: destination.url })) {
      return res
        .status(409)
        .send({ message: "Blog with the same URL already exists" });
    }

    // 3. Send data to database
    const response = await DestinationModel.create(destination);
    console.log(response);
    res.status(200).send({ message: "Data entered successfully" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res
      .status(500)
      .send({ message: "An error occurred while adding the blog" });
  }
});

// Update a destination

// Delete a destination

module.exports = router;
