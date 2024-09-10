const express = require("express");
const router = express.Router();
const DestinationModel = require("../models/DestinationModel");

// 1. Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await DestinationModel.find({}).sort({ name: 1 });
    res.status(200).json({
      message: "success",
      results: destinations.length,
      data: destinations,
    });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving destinations from DB" });
  }
});

// 2. Get destination options
router.get("/options", async (req, res) => {
  try {
    const destinations = await DestinationModel.find({}).sort({ name: 1 });
    const options = destinations.map(
      (destination) => `${destination.name}, ${destination.country}`
    );
    console.log(options);
    res.status(200).json(options);
  } catch (error) {
    console.error("Error retrieving destinations:", error);
    res.status(500).json({ message: "Error retrieving destinations from DB" });
  }
});

// 3. Get one destination
router.get("/:url", async (req, res) => {
  try {
    const reqUrl = req.params.url; // Extracting the url from req.params
    const destination = await DestinationModel.findOne({ url: reqUrl });
    if (!destination) {
      return res.status(404).send({ message: "Destination not found" });
    }
    res.status(200).send(destination);
  } catch (error) {
    console.error(`Error: ${error}`);
    console.log(req.body);
    res
      .status(500)
      .send({ message: "An error occurred while retrieving the destination" });
  }
});

// 4. Add a destination
router.post("/add", async (req, res) => {
  try {
    const destination = {
      name: req.body.name,
      url: req.body.url,
      image: req.body.image,
      description: req.body.description,
      country: req.body.country,
      status: req.body.status,
    };

    // console.log(destination);

    if (await DestinationModel.findOne({ url: destination.url })) {
      return res
        .status(409)
        .send({ message: "Blog with the same URL already exists" });
    }

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

// 5. Update a destination
router.post("/update/:id", async (req, res) => {
  try {
    console.log("Incoming request data:", req.body);

    // Use the _id parameter to find and update the destination
    const destination = await DestinationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    console.log("Updated destination data:", destination);

    if (!destination) {
      return res.status(404).send({ message: "Destination not found" });
    }

    res.send({ message: "Destination updated successfully", destination });
  } catch (error) {
    console.error("Error updating destination:", error);
    res
      .status(500)
      .send({ message: "An error occurred while updating the destination" });
  }
});

// 6. Delete a destination

router.delete("/delete/:url", async (req, res) => {
  const { url } = req.params;
  try {
    await DestinationModel.findOneAndDelete({ url });
    res.status(200).send({ message: "Destination deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the destination" });
    console.log(error);
  }
});

module.exports = router;
