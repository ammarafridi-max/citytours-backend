const express = require("express");
const router = express.Router();
const BlogModel = require("../models/BlogModel");

// 1. Retrieve all blogs
router.get("/", async (req, res) => {
  const blogs = await BlogModel.find({});
  res.send(blogs);
});

// 2. Retrieve a blog
router.get("/get/:url", async (req, res) => {
  try {
    const { url } = req.params;
    const blog = await BlogModel.findOne({ url: req.params.url });
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (error) {
    console.error(`Error: ${error}`);
    res
      .status(500)
      .send({ message: "An error occurred while retrieving the blog" });
  }
});

// 3. Add a new blog
router.post("/add", async (req, res) => {
  try {
    // 1. Retrieve Data
    const blogData = {
      title: req.body.title,
      url: req.body.url,
      author: "City Tours UAE Team",
      tag: req.body.tag,
      image: req.body.image,
      dateCreated: req.body.dateCreated,
      dateUpdated: "",
      text: req.body.description,
    };

    // 2. Check if a blog with the same URL already exists
    if (await BlogModel.findOne({ url: blogData.url })) {
      return res
        .status(409)
        .send({ message: "Blog with the same URL already exists" });
    }

    // 3. Send data to database
    const response = await BlogModel.create(blogData);
    console.log(response);
    res.status(200).send({ message: "Data entered successfully" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res
      .status(500)
      .send({ message: "An error occurred while adding the blog" });
  }
});

// 4. Delete a blog
router.delete("/delete/:id", async (req, res) => {
  // 1. Get unique identifier from frontend
  const { id } = req.params;

  // 2. Delete blog post from database
  try {
    await BlogModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    //   3. Send error message
    res.status(500).send({ message: "Error deleting data" });
  }
});

// 5. Update a blog
router.post("/update/:url", async (req, res) => {
  try {
    const blog = await BlogModel.findOneAndUpdate(
      { url: req.params.url },
      req.body,
      { new: true }
    );
    if (!blog) res.status(404).send({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
