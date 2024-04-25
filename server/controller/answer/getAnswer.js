const Answer = require("../../models/answer.model");
const factory = require("./../handlerFactory")


exports.getOneAnswer = factory.getOne(Answer)
exports.getAllAnswer = factory.getAll(Answer)
