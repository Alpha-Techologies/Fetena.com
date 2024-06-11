const Exam = require("../../models/exam.model");
const factory = require("./../handlerFactory")


exports.deleteExam = factory.deleteOne(Exam)
