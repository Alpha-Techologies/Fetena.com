// routes/logCsvRoutes.js
const attendanceController = require("../controller/exports/attendanceController");

const express = require("express");
const router = express.Router();

router.route("/").get((req, res, next) => {
  console.log("her");
  res.send("dh");
});

// New endpoint for exporting logs to CSV
router.route("/attendance/:id").get(attendanceController);

module.exports = router;
