// controllers/logCsvController.js

const path = require("path");
const fs = require("fs");
const { exportLogsToCsv } = require("../../utils/csvExporter");

const exportLogsToCSV = async (req, res) => {
  try {
    const fileName = "activity_logs.csv";
    const filePath = path.join(__dirname, "../../exports", fileName);

    await exportLogsToCsv(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error downloading the file." });
      }
      // Optionally, delete the file after download if not needed
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to export logs" });
  }
};

module.exports = {
  exportLogsToCSV
};