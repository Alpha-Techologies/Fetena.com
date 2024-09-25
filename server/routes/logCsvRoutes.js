// routes/logCsvRoutes.js

const express = require("express");
const router = express.Router();
const { exportLogsToCSV } = require("../controller/log/logCsvController");

// New endpoint for exporting logs to CSV
router
  .route("/csv")
  .get(exportLogsToCSV);

module.exports = router;