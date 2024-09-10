const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String },
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
});

const RoleModel = mongoose.model("role", RoleSchema);

module.exports = RoleModel;
