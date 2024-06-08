const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
const examRouter = require("./examRoutes");
const questionRouter = require("./questionRoutes");
const organizationRouter = require("./organizationRoutes");
const notificationRouter = require("./notificationRoutes");
const userAnswerRouter = require("./userAnswerRoutes");
// const sseRouter = require("./sseRouters");
// const chatRouter = require("./chatRoutes");
const certificateRouter = require("./certificateRoutes");
const statsRouter = require("./statsRoutes")
router.use("/users", userRouter);
router.use("/exams", examRouter);
router.use("/questions", questionRouter);
router.use("/organizations", organizationRouter);
router.use("/notifications", notificationRouter);
router.use("/useranswers", userAnswerRouter);
// router.use("/sse",sseRouter)
// router.use("/chat",chatRouter)
router.use("/cert",certificateRouter)
router.use("/stats", statsRouter)

router.use("/log", logRouter);

module.exports = router;
