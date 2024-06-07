const Question = require("../../models/question.model");
const factory = require("./../handlerFactory");

exports.updateQuestion = factory.updateOne(Question);
