const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory")

exports.evaluateUserAnswer = factory.createMany(userAnswer)