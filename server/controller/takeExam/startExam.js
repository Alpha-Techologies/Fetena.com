const catchAsync = require("../../utils/catchAsync");
const Exam = require("../../models/exam.model");
const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/APIError");
const TakeExam = require("../../models/take.exam.model");

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

  // check if the exam is currently in progress or if he has not started the exam
  if (isExamStarted && isExamStarted.status === "inprogress") {
    return next(
      new APIError("Exam is already in progress", StatusCodes.CONFLICT)
    );
  }

  // create the exam take object
  const doc = await TakeExam.create({
    exam: examId,
    user: req.user.id,
    status: "inprogress",
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

module.exports = startExam;
