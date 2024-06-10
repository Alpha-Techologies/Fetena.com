const TakeExam = require("../../models/take.exam.model");
const factory = require("../handlerFactory");

exports.getTakenExam = factory.getAll(TakeExam ,  'addUser');