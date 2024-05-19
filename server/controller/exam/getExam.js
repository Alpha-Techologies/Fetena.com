const Exam = require("../../models/exam.model");
const factory = require("./../handlerFactory")


exports.getOneExam = factory.getOne(Exam)
exports.getAllExam = factory.getAll(Exam, "addOrganization")
exports.getMyExam = factory.getAll(Exam , "addExamCreater")