const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  dateCreated: { type: String },
  dateUpdated: { type: String },
  name: { type: String },
  url: { type: String, unique: true },
  image: { type: String },
  description: { type: String },
  duration: { type: String },
  location: {
    city: { type: String },
    country: { type: String },
  },
  age: {
    adults: { type: String },
    children: { type: String },
    infants: { type: String },
  },
  price: {
    adults: { type: Number },
    children: { type: Number },
    infants: { type: Number },
  },
  inclusions: { type: Array },
  exclusions: { type: Array },
  additionalInformation: { type: String },
});

const TourModel = mongoose.model("tours", TourSchema);

module.exports = TourModel;
