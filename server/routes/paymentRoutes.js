const express = require("express");
const paymentController = require("../controller/payment/paymentController")
// const {getTransaction} = require("../controller/payment/getTransaction")

const router = express.Router()

router.post("/initialize", paymentController.createPaymentIntent)

router.post("/verify", paymentController.verifyPayment)

// router.get("/transaction/:id", getTransaction)

module.exports = router