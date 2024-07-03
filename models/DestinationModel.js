const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  image: { type: String },
  description: { type: String },
});

const DestinationModel = mongoose.model("destinations", DestinationSchema);

module.exports = DestinationModel;
