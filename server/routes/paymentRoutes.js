import express from "express"
import paymentController from "../controller/payment/paymentController"

const router = express.Router()

router.post("/initialize", paymentController.createPaymentIntent)

router.post("/verify", paymentController.verifyPayment)

export default router;