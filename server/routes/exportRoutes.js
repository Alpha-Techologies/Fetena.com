// routes/logCsvRoutes.js
const { protect } = require("../controller/auth");
const {
  exportAttendanceToCSV,
} = require("../controller/exports/attendanceController");

const express = require("express");
const router = express.Router();

// router.route("/").get((req, res, next) => {
//   console.log("her");
//   res.send("dh");
// });

// New endpoint for exporting logs to CSV
router.route("/attendance/:id").get(protect, exportAttendanceToCSV);

module.exports = router;
