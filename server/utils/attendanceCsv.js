const TakeExam = require("../models/take.exam.model");
const userAnswer = require("../models/user.answer.model");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const exportAttendanceToCsv = async (filePath, takeExamId) => {
  // Find all exams and populate related user data
  const exams = await TakeExam.findOne({ _id: takeExamId })
    .populate("exam", "name") // Adjust field names as per your `Exam` schema
    .populate("user", "email")
    .populate("userAnswer", "score")
    .exec();

  //   const userAnswers = await userAnswer.find().populate("examId", "name email");
  // const userAnswers = await userAnswer.find().populate("score");

  console.log(exams);

  // Initialize CSV Writer
  // const csvWriter = createCsvWriter({
  //   path: filePath,
  //   header: [
  //     { id: "examId", title: "Exam ID" },
  //     // { id: 'exam', title: 'Exam Name' },
  //     { id: "userId", title: "User ID" },
  //     { id: "user", title: "User" },
  //     { id: "status", title: "Status" },
  //     { id: "startTime", title: "Start Time" },
  //     // { id: 'endTime', title: 'End Time' },
  //     { id: "score", title: "Score" },
  //   ],
  // });

  // // Map data to CSV format
  // console.log(exams);
  // const records = exams.map((exam) => ({
  //   examId: exam.exam ? exam.exam._id.toString() : "Unknown",
  //   // exam: exam.exam ? exam.exam.name : 'Unknown',
  //   userId: exam.user ? exam.user._id.toString() : "Unknown",
  //   user: exam.user ? `${exam.user.email}` : "Unknown",
  //   status: exam.status,
  //   startTime: exam.startTime ? exam.startTime : "N/A",
  //   // endTime: exam.endTime ? exam.endTime.toISOString() : 'N/A',
  //   // endTime: exam.endTime ? new exam.startTimeDate(exam.endTime).toISOString() : 'N/A',
  //   score: userAnswer ? userAnswer.score : "N/A",
  // }));

  // // Write the records to a CSV file
  // await csvWriter.writeRecords(records);
};

module.exports = {
  exportAttendanceToCsv,
};
