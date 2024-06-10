const express = require("express");
const router = express.Router();

const {
  createUserAnswer,
  getOneUserAnswer,
  evaluateUserAnswer,
} = require("../controller/userAnswer");
const { protect } = require("../controller/auth");

router
  .route("/:id")
  .get(protect, getOneUserAnswer)
  .post(protect, createUserAnswer);

router.route("/eval/:id").post(protect, evaluateUserAnswer);

module.exports = router;
