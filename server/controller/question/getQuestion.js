const Question = require("../../models/question.model");
const factory = require("./../handlerFactory")


exports.getOneQuestion = factory.getOne(Question)
exports.getAllQuestion = factory.getAll(Question)
