const Question = require("../../models/question.model");
const factory = require("./../handlerFactory");

exports.getOneQuestion = function () {
  return factory.getOne(Question);
};

exports.getAllQuestion = function () {
  return factory.getAll(Question);
};