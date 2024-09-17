const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  dateCreated: { type: Date },
  dateUpdated: { type: Date },
  title: { type: String, required: true, trim: true },
  url: { type: String, unique: true, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  tag: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true },
  destination: { type: String, required: true, trim: true },
  excerpt: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
});

BlogSchema.index({ url: 1 });

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;
