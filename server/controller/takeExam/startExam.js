const catchAsync = require("../../utils/catchAsync");
const Exam = require("../../models/exam.model");
const StatusCodes = require("http-status-codes");
const APIError = require("../../utils/APIError");


const startExam = catchAsync(async (req, res, next) => {
  const examId = req.params.examId;

  const exam = await Exam.findById(examId);

  if (!exam) {
    return next(APIError("Exam not found", StatusCodes.BAD_REQUEST));
  }

  // check if the exam is active
  if (!exam.isActive) {
    return next(APIError("Exam is not active", StatusCodes.BAD_REQUEST));
  }

  // check the exam status if it is closed or not
  if (exam.status === "closed") {
    return next(APIError("Exam is closed", StatusCodes.BAD_REQUEST));
  }

  // check if the exam is already started by the user
    const isExamStarted = await TakeExam.findOne({
        examId: examId,
        userId: req.user.id,
    });

    // check if the exam is currently in progress or if he has not started the exam
    if (isExamStarted && isExamStarted.status === "inprogress") {
        return next(APIError("Exam is already in progress", StatusCodes.BAD_REQUEST));
    }







});
