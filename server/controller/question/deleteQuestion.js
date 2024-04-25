const Question = require("../../models/question.model");
const factory = require("./../handlerFactory")


exports.deleteQuestion = factory.deleteOne(Question)
