const Question = require("../../models/question.model");
const factory = require("./../handlerFactory");

exports.createQuestion = factory.createMany(Question, true);
    
