import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
    {
        tx_ref: {
            type: String,
            required: true,
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
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
        currency: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Transaction", transactionSchema)