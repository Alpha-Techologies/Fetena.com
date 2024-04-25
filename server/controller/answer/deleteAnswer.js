const Answer = require("../../models/answer.model");
const factory = require("./../handlerFactory")


exports.deleteAnswer = factory.deleteOne(Answer)
