const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String, unique: true },
  author: { type: String },
  tag: { type: String },
  image: { type: String },
  dateCreated: { type: String },
  dateUpdated: { type: String },
  text: { type: String },
});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;
