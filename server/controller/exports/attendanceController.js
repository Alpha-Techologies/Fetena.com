const path = require("path");
const fs = require("fs");
const { exportAttendanceToCsv } = require("../../utils/attendanceCsv");
const catchAsync = require("../../utils/catchAsync");
const TakeExam = require("../../models/take.exam.model");
const { StatusCodes } = require("http-status-codes");

const exportAttendanceToCSV = catchAsync(async (req, res, next) => {
  // if the take exam exits
  const takeExam = await TakeExam.findOne({ _id: req.params.id });

  if (!takeExam) {
    return next(new APIError("Take Exam id Invalid.", StatusCodes.BAD_REQUEST));
  }

  // Define file name and path
  const fileName = "attendance_logs.csv";
  const filePath = path.join(__dirname, "../../exports", fileName);

  console.log(filePath, "log the file path");

  // Ensure the export directory exists
  if (!fs.existsSync(path.join(__dirname, "../../exports"))) {
    fs.mkdirSync(path.join(__dirname, "../../exports"));
  }

  // Export data to CSV
  await exportAttendanceToCsv(filePath, takeExam._id);
  console.log("exporting attendance to csv");

  // // Respond with the CSV file
  // res.download(filePath, fileName, (err) => {
  //   if (err) {
  //     return res.status(500).json({ error: "Error downloading the file." });
  //   }

  //   // Optionally, delete the file after download if not needed
  //   // fs.unlinkSync(filePath);
  // });

  return res.status(500).json({ error: "Failed to export attendance to CSV" });
});

module.exports = {
  exportAttendanceToCSV,
};
