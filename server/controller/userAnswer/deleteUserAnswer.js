const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory");

exports.createUserAnswer =factory.createMany(userAnswer);
