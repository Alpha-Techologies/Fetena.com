// routes/logCsvRoutes.js

const express = require("express");
const router = express.Router();
const { exportAttendanceToCSV } = require("../controller/attendance/attController");

// New endpoint for exporting logs to CSV
router
  .route("/csv")
  .get(exportAttendanceToCSV);

module.exports = router;

