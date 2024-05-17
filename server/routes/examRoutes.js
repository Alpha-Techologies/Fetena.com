const express = require("express");
const router = express.Router();
// import '../controller/exam'
const {
  createExam,
  deleteExam,
  getOneExam,
  getAllExam,
  updateExam,
} = require("../controller/exam");
const { protect } = require("../controller/auth");
 
router.route("/").get(protect, getAllExam).post(protect, createExam);

router
  .route("/:id")
  .get(protect, getOneExam)
  .put(protect, updateExam)
  .delete(protect, deleteExam);

module.exports = router;
