const Answer = require("../../models/answer.model");
const factory = require("./../handlerFactory")


exports.updateAnswer = factory.updateOne(Answer)
