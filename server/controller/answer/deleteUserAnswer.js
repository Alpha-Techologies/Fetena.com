const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory")

exports.deleteUserAnswer = factory.deleteMany(userAnswer)