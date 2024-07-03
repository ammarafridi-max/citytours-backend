const mongoose = require("mongoose")

const ActivitySchema = new mongoose.Schema({
    image: String,
    name: String,
    url: String,
    category: String,
    duration: String,
    inquiryMode: Boolean,
    ageRange: {
        adults: String,
        children: String,
        infants: String
    },
    description: String,
    highlights: [String],
    inclusions: [String],
    exclusions: [String],
    location: {
        city: String,
        country: String
    },
    tickets: [{
        name: String,
        description: String,
        price: {
        adults: Number,
        children: Number,
        infants: Number
        }
    }],
    reviewAverage: Number,
    reviewNumbers: Number
})

const ActivityModel = mongoose.model("activities", ActivitySchema)

module.exports = ActivityModel;