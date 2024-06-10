const factory = require("../handlerFactory");
const Transaction = require("../../models/transaction.model");

exports.getOneTransaction = factory.getOne(Transaction);
