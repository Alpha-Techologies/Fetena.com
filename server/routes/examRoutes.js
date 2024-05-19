const express = require("express");
const router = express.Router();

const takeExamRouter = require("./takeExamRoutes");

// import '../controller/exam'
const {
  createExam,
  deleteExam,
  getOneExam,
  getAllExam,
  updateExam,
  getMyExam,
  updateExamResource,
} = require("../controller/exam");

router.use(takeExamRouter);

const { protect, restrictTo } = require("../controller/auth");

router
  .route("/")
  .get(protect, restrictTo(true), getAllExam)
  .post(protect, createExam);
router.route("/my-exam").get(protect, getMyExam);

router.route("/resource/:id").patch(protect, updateExamResource);

router
  .route("/:id")
  .get(protect, getOneExam)
  .patch(protect, updateExam)
  .delete(protect, deleteExam);

module.exports = router;
