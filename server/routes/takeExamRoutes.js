// take exam routes
const express = require("express");
const {
  startExam,
  getAllExamTaker,
  getOneExamTaker,
} = require("../controller/takeExam");

const { protect } = require("../controller/auth");
const router = express.Router();

router.route("/start-exam/:id").post(protect, startExam);

router.route("/exam-taker/:id").get(protect, getOneExamTaker);
// get all the exam taken history of a exam in which is provided the examid in param
router.route("/exam-history/:id").get(protect, getAllExamTaker);

module.exports = router;
