const Exam = require("../../models/exam.model");
const factory = require("./../handlerFactory")


exports.updateExam = factory.updateOne(Exam)
