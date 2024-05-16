// organization members.

const mongoose = require("mongoose");


const OrganizationExaminerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "organization is required"],
  },
  status: {
    type: String,
    enum: ["pending", "activated", "deactivated"],
    default: "pending",
  },
});

const OrganizationExaminer = mongoose.model(
  "OrganizationExaminer",
  OrganizationExaminerSchema
);

module.exports = OrganizationExaminer;
