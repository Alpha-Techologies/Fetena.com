const Question = require("../../models/question.model");
const factory = require("./../handlerFactory");

exports.createQuestion = function(){
    return factory.createMany(Question, true);
}
    
