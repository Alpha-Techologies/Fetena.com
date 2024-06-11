const { StatusCodes } = require("http-status-codes");
const Exam = require("../../models/exam.model");
const catchAsync = require("../../utils/catchAsync");
const generateRandomKey = require("../../utils/generateRandomKey");

const generateExam = catchAsync(async (req, res, next) => {
  const numberOfDates = req.body.numberOfDates;

  // create a random number of exams per day for the user
  for (let i = 0; i < numberOfDates; i++) {
    // create a random date
    const date = new Date();
    date.setDate(date.getDate() + i);

    // create a random exam
    // randomly set the number of exams created on that day
    //randomly choose security of the exam and also the examType
    const numberOfExams = Math.floor(Math.random() * 10) + 1;

    for (let j = 0; j < numberOfExams; j++) {
      console.log("Creating exam");
      let exam = new Exam({
        date: date,
        createdBy: req.user.id,
        examKey: generateRandomKey(6),
        visibility: 'private',
        securityLevel: Math.random() < 0.5 ? "low" : "high",
        examType: Math.random() < 0.5 ? "pdfUpload" : "online",
        instruction: 'This is a test instruction',
        duration: Math.floor(Math.random() * 60) + 1,
        announcement: ['This is a test announcement'],
        toolsPermitted: ['calculator', 'notes', 'internet'],
        privateAnswer: Math.random() < 0.5 ? true : false,
        privateScore: Math.random() < 0.5 ? true : false,
        examName: 'Test Exam',
        

      });

      await exam.save();
    }
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Exams generated successfully",
  });
});

module.exports = {
  generateExam,
};
