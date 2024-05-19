const factory = require("../handlerFactory");
const TakeExam = require("../../models/take.exam.model");

// get all the exam taken history of a exam
exports.getAllExamTaker = factory.getAll(TakeExam, "addExam");
exports.updateTakeExam = factory.updateOne(TakeExam);
exports.getOneExamTaker = factory.getOne(TakeExam);
