const Question = require("../../models/question.model");
const factory = require("./../handlerFactory")


exports.updateQuestion = function () {
  return  factory.updateOne(Question)
}

