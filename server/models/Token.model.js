const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("tokens", tokenSchema);

module.exports = { TokenModel };
