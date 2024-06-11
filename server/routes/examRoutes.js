const express = require("express");
const router = express.Router();

const takeExamRouter = require("./takeExamRoutes");

const {
  createExam,
  deleteExam,
  getOneExam,
  getAllExam,
  updateExam,
  getMyExam,
  updateExamResource,
  getPublicExam,
  updateManyQuestion,
} = require("../controller/exam");


router.use(takeExamRouter);

const { protect, restrictTo } = require("../controller/auth");


router.route("/").get(protect, getAllExam).post(protect, createExam);
router.route("/my-exam/:id").get(protect, getMyExam);
router.route("/get-public").get(protect, getPublicExam);

router.route("/questions/:id").patch(protect, updateManyQuestion);
router.route("/resource/:id").patch(protect, updateExamResource);

router.route("/organizations/:id")
.get(protect, restrictTo(true), getAllExam);

router
  .route("/:id")
  .get(protect, getOneExam)
  .patch(protect, updateExam)
  .delete(protect, deleteExam)


module.exports = router;
