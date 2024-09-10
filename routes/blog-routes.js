const express = require("express");
const router = express.Router();
const BlogModel = require("../models/BlogModel");
const cloudinary = require("cloudinary").v2;

// 1. Retrieve all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find({}).sort({ _id: -1 });

    if (!blogs)
      return res
        .status(404)
        .json({ message: "failed", data: "Blogs not found" });

    res.status(200).json({
      message: "success",
      results: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching blogs", error });
  }
});

// 2. Retrieve a blog
router.get("/get/:url", async (req, res) => {
  try {
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
    const blogData = {
      title: req.body.title,
      url: req.body.url,
      author: "City Tours UAE Team",
      tag: req.body.tag,
      image: req.body.image,
      status: req.body.status,
      dateCreated: req.body.dateCreated,
      dateUpdated: "",
      destination: req.body.destination,
      excerpt: req.body.excerpt,
      content: req.body.content,
    };

    // Check if a blog with the same URL already exists
    if (await BlogModel.findOne({ url: blogData.url })) {
      return res
        .status(409)
        .send({ message: "Blog with the same URL already exists" });
    }

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
  const { id } = req.params;

  try {
    await BlogModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
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
    res.status(200).send({ message: "Blog update successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
