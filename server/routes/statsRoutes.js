const express = require("express");
const router = express.Router();

const { getOrgStats } = require("../controller/stats/getOrgStats");

const { getExamStats } = require("../controller/stats/getExamStats");

const { getUserStats } = require("../controller/stats/getUserStats");

const { protect, restrictTo } = require("../controller/auth");
const { generateExam } = require("../controller/stats/generateExam");
const { getMe } = require("../controller/userController");

router.route("/org/:id").get(protect, restrictTo(true), getOrgStats);

router.route("/exam/:id").get(protect, restrictTo(true), getExamStats);

router.route("/user/").get(protect, getMe, getUserStats);

router.route("/gen").post(protect, generateExam);

module.exports = router;
