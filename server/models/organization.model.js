const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  website: String,
  phone: Number,
  email: String,
  logo: String,
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;
