const catchAsync = require("../../utils/catchAsync");
const Exam = require("../../models/exam.model");
const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/apiError");
const TakeExam = require("../../models/take.exam.model");
const UserAnswer = require("../../models/user.answer.model");

const startExam = catchAsync(async (req, res, next) => {
  const examId = req.params.id;

  const exam = await Exam.findById(examId);

  if (!exam) {
    return next(APIError("Exam not found", StatusCodes.BAD_REQUEST));
  }

  // check the exam status if it is closed or not
  if (exam.status === "closed") {
    return next(new APIError("Exam is closed", StatusCodes.BAD_REQUEST));
  }

  // check if the exam is already started by the user
  const isExamStarted = await TakeExam.findOne({
    exam: examId,
    user: req.user.id,
  });

  if (isExamStarted) {
    return res.status(200).json({
      status: "success",
      data: isExamStarted,
    });
  }

  // check if the exam is currently in progress or if he has not started the exam
  if (isExamStarted && isExamStarted.status === "inprogress") {
    return next(
      new APIError("Exam is already in progress", StatusCodes.CONFLICT)
    );
  }

  //check if exam is submitted
  if (isExamStarted && isExamStarted.status === "submitted") {
    return next(
      new APIError("Exam is already submitted", StatusCodes.CONFLICT)
    );
  }

  //check if the exam is terminated
  if (isExamStarted && isExamStarted.status === "terminated") {
    return next(new APIError("Exam is terminated", StatusCodes.CONFLICT));
  }

  const userAnswer = await UserAnswer.create({
    examId: examId,
    questionAnswers: [],
    score: 0,
  });

  // create the exam take object
  const doc = await TakeExam.create({
    exam: examId,
    user: req.user.id,
    status: "inprogress",
    userAnswers: userAnswer._id,
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

module.exports = startExam;
