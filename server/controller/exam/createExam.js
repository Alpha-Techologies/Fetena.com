const Exam = require("../../models/exam.model");
const factory = require("./../handlerFactory")


exports.createExam = factory.createOne(Exam)
