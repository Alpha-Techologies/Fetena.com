const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    tx_ref: {
      type: String,
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    subscription: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
      required: true,
        }
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
