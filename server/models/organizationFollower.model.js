const { default: mongoose } = require("mongoose");

const OrganizationFollowerSchema = new mongoose.Schema({
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
});

const OrganizationFollower = mongoose.model(
  "OrganizationFollower",
  OrganizationFollowerSchema
);

module.exports = OrganizationFollower;
