const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory")

exports.evaluateUserAnswer = function() {

    return factory.createMany(userAnswer)
}
