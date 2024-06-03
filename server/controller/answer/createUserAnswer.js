const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory")

exports.createUserAnswer = function(){
    return factory.createMany(userAnswer)
}