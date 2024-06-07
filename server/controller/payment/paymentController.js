const Listing = require('../models/listing.model.js');
const httpStatus = require("http-status");
const config = require('./config.js');
const APIError = require('../../utils/apiError.js');
const axios = require('../models/axios.model.js');
const Transaction = require('../../models/transaction.model.js');

exports.createPaymentIntent = async (req, res) => {
    const { listingId } = req.query;
    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new APIError("Listing not found", httpStatus.NOT_FOUND);
    }
    const { email, amount, currency } = req.body;
    const tx_ref = `CTX-${Date.now()}-${listingId}`;
    const payload = {
        email,
        amount,
        currency,
        tx_ref,
        "customization[title]": "Payment for listing property",
        "customization[description]": "Listing property payment on Gojo Housing",
        // callback_url: `${config.FRONTEND_URL}/verify-payment?ref=${tx_ref}`,
        return_url: `${config.FRONTEND_URL}/verify-payment?ref=${tx_ref}`,
    };

    try {
        const response = await axios({
            method: "POST",
            url: `${config.CHAPA_ENDPOINT}/initialize`,
            data: payload,
            headers: {
                Authorization: `Bearer ${config.CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        const transaction = new Transaction({
            tx_ref,
            property: listingId,
            status: "pending",
            amount,
            currency,
        });
        await transaction.save();
        return res.status(httpStatus.OK).json(response.data);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { data } = await axios({
            method: "GET",
            url: `${config.CHAPA_ENDPOINT}/verify/${req.query.tx_ref}`,
            headers: {
                Authorization: `Bearer ${config.CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        console.log(data);
        const transaction = await Transaction.findOne({
            tx_ref: req.query.tx_ref,
        });
        if (!transaction) {
            throw new APIError("Transaction not found", httpStatus.NOT_FOUND);
        }
        transaction.status = "paid";
        await transaction.save();
        if (transaction.property) {
            const listing = await Listing.findById(transaction.property);
            if (!listing) {
                throw new APIError("Listing not found", httpStatus.NOT_FOUND);
            }
            listing.paymentStatus = "paid";
            await listing.save();
            return res.status(httpStatus.OK).json({
                message: "Payment verified and listing updated",
                listing,
                transaction: data,
            });
        }
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
    }
};