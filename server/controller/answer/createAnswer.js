const Answer = require("../../models/answer.model");
const factory = require("./../handlerFactory")


exports.createAnswer = factory.createOne(Answer)
