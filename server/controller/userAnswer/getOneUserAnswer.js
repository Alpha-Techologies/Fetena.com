const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory")

exports.getOneUserAnswer = function() {
    return factory.getOne(userAnswer)
}
