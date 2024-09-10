const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  dateCreated: { type: Date },
  dateUpdated: { type: Date },
  title: { type: String },
  url: { type: String, unique: true },
  image: { type: String },
  description: { type: String },
  duration: {
    days: { type: Number },
    nights: { type: Number },
  },
  inclusions: { type: Array },
  exclusions: { type: Array },
  destination: { type: String },
  status: { type: String },
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

  additionalInformation: { type: String },
});

const TourModel = mongoose.model("tours", TourSchema);

module.exports = TourModel;
