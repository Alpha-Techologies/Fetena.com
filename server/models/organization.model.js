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
    type: String,
    default: false,
  },
  website: String,
  phone: Number,
  email: String,
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  examiners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;
