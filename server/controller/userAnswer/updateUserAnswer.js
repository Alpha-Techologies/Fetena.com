const userAnswer = require("../../models/user.answer.model");
const factory = require("./../handlerFactory");

exports.updateUserAnswer = function () {
  return factory.updateOne(userAnswer);
};
