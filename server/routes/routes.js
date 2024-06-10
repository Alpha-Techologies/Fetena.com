const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
const examRouter = require("./examRoutes");
const questionRouter = require("./questionRoutes");
const organizationRouter = require("./organizationRoutes");
const notificationRouter = require("./notificationRoutes");
const paymentRouter = require("./paymentRoutes");
const userAnswerRouter = require("./userAnswerRoutes");
const logRouter = require("./logRoutes");
const transactionRouter = require("./transactionRoutes");

const certificateRouter = require("./certificateRoutes");
const statsRouter = require("./statsRoutes");
// const sseRouter = require("./sseRoutes");

const exportRouter = require("./exportRoutes");

router.use("/users", userRouter);
router.use("/exams", examRouter);
router.use("/questions", questionRouter);
router.use("/organizations", organizationRouter);
router.use("/notifications", notificationRouter);
router.use("/useranswers", userAnswerRouter);
router.use("/payment", paymentRouter);
router.use("/transactions", transactionRouter);

router.use("/cert", certificateRouter);
router.use("/stats", statsRouter);

// router.use("/sse",sseRouter)
// router.use("/chat",chatRouter)

router.use("/log", logRouter);

router.use("/exports", exportRouter);

module.exports = router;
