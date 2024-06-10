const { StatusCodes } = require("http-status-codes");
const config = require("./config.js");
const APIError = require("../../utils/apiError.js");
const Transaction = require("../../models/transaction.model.js");
const Organization = require("../../models/organization.model.js");
const axios = require("axios");
const moment = require("moment");
const catchAsync = require("../../utils/catchAsync.js");

exports.createPaymentIntent = catchAsync(async (req, res, next) => {
  const { organizationId } = req.query;
  //   console.log(organizationId, "query org id");
  const organization = await Organization.findById(organizationId);
  //   console.log(organization);
  if (!organization) {
    throw new APIError("organization not found", StatusCodes.NOT_FOUND);
  }
  const { amount, currency, subscription, startDate, endDate } = req.body;
  const tx_ref = `CTX-${Date.now()}-${organizationId}`;
  const payload = {
    amount,
    currency,
    tx_ref,
    // "customization[title]": "Payment for organization subscription",
    // "customization[description]": "Payment on Fetena.com",
    // callback_url: `http://localhost:8080/api/payment/verify?tx_ref=${tx_ref}`,
    return_url: `http://localhost:4000/dashboard/verify-payment?ref=${tx_ref}`,
  };

  const resp = await axios({
    method: "POST",
    url: `https://api.chapa.co/v1/transaction/initialize`,
    data: payload,
    headers: {
      Authorization: `Bearer CHASECK_TEST-qznPhnGPbcapebJrVIrXXErZSFIiUz0v`,
      "Content-Type": "application/json",
    },
  });
  //       .then((response) => {
  //     console.log(response, "response data");
  //     res.status(201).json(response.data);
  //   });

  //   console.log(resp.data);

  // const response = await axios({
  //   method: "POST",
  //   url: `${process.env.CHAPA_ENDPOINT}/initialize`,
  //   data: payload,
  //   headers: {
  //     Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  // })

  // console.log(response, "response data");

  const transaction = await Transaction.create({
    tx_ref,
    organization: organizationId,
    status: "pending",
    amount,
    currency,
    subscription,
    startDate,
    endDate,
  });

  //   console.log(transaction);

  res.status(201).json({
    status: "success",
      data: transaction,
    chapa: resp.data,
  });
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
    console.log("this is done")
    const resp = await axios({
      method: "GET",
      url: `https://api.chapa.co/v1/transaction/verify/${req.query.tx_ref}`,
      headers: {
        Authorization: `Bearer CHASECK_TEST-qznPhnGPbcapebJrVIrXXErZSFIiUz0v`,
        "Content-Type": "application/json",
      },
    });
  
    const transaction = await Transaction.findOne({
      tx_ref: req.query.tx_ref,
    });
    if (!transaction) {
      throw new APIError("Transaction not found", StatusCodes.NOT_FOUND);
    }
    transaction.status = "paid";
    await transaction.save();

     res.status(201).json({
       status: "success",
       data: transaction,
       chapa: resp.data,
     });
      
});
