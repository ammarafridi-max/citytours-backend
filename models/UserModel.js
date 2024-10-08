const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  dateCreated: { type: Date },
  dateUpdated: { type: Date },
  name: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  permissions: {
    blogs: {
      create: { type: Boolean },
      read: { type: Boolean },
      update: { type: Boolean },
      delete: { type: Boolean },
    },
    destinations: {
      create: { type: Boolean },
      read: { type: Boolean },
      update: { type: Boolean },
      delete: { type: Boolean },
    },
    tours: {
      create: { type: Boolean },
      read: { type: Boolean },
      update: { type: Boolean },
      delete: { type: Boolean },
    },
    users: {
      create: { type: Boolean },
      read: { type: Boolean },
      update: { type: Boolean },
      delete: { type: Boolean },
    },
  },
  status: { type: String },
  profilePicture: { type: String },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
