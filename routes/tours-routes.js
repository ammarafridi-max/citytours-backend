const express = require("express");
const router = express.Router();
const TourModel = require("../models/TourModel");

// 1. Retrieve all tours
router.get("/", async (req, res) => {
  const tours = await TourModel.find();
  res.send(tours);
});

// 2. Retrieve a tour
router.get("/:url", async (req, res) => {
  try {
    const { url } = req.params;
    const tour = await TourModel.findOne({ url: req.params.url });
    if (!tour) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res.status(200).send(tour);
  } catch (error) {
    console.error(`Error: ${error}`);
    res
      .status(500)
      .send({ message: "An error occurred while retrieving the blog" });
  }
});

// 3. Upload a tour
router.post("/create", async (req, res) => {
  try {
    const tour = {
      dateCreated: req.body.dateCreated,
      dateUpdated: req.body.dateUpdated,
      name: req.body.name,
      url: req.body.url,
      image: req.body.image,
      description: req.body.description,
      duration: req.body.duration,
      location: req.body.location,
      age: req.body.age,
      price: req.body.price,
      inclusions: req.body.inclusions,
      exclusions: req.body.exclusions,
      additionalInformation: req.body.additionalInformation,
    };
    console.log(tour);

    if (await TourModel.findOne({ url: tour.url })) {
      return res
        .status(409)
        .send({ message: "Blog with the same URL already exists" });
    }

    const response = await TourModel.create(tour);
    console.log(response);
    res.status(200).send({ message: "Data entered successfully" });
  } catch (error) {
    console.log(`Error ${error}`);
    res
      .status(500)
      .send({ message: "An error occurred while adding the blog" });
  }
});

// 4. Delete a tour
router.delete("/delete/:url", async (req, res) => {
  const { url } = req.params;
  try {
    await TourModel.findOneAndDelete({ url: url });
    res.status(200).send({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// 5. Update a tour
router.post("/update/:url", async (req, res) => {
  try {
    const tour = await TourModel.findOneAndUpdate(
      { url: req.params.url },
      req.body,
      { new: true }
    );
    console.log(tour);
    if (!tour) res.status(404).send({ message: "Tour not found" });
    res.send({ message: "Tour updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
