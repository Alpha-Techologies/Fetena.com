const express = require("express");
const router = express.Router();

const {
  createUserAnswer,
  deleteUserAnswer,
  getAllUserAnswer,
  getOneUserAnswer,
  updateUserAnswer,
  evaluateUserAnswer,
} = require("../controller/userAnswer");
const { protect } = require("../controller/auth");

router
  .route("/:id")
  .get(protect, getOneUserAnswer)
  .post(protect, createUserAnswer);

router.route("/eval/:id").post(protect, evaluateUserAnswer);
// .post(evaluateUserAnswer)
// .put(updateQuestion)
// .delete(deleteQuestion);

// router.route("/")
// .get(getAllQuestion)

module.exports = router;
