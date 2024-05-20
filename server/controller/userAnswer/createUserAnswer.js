const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory")


// takes  user id and exam id {questionID and answerText}
exports.createUserAnswer = factory.updateOne(userAnswer)