const Transaction = require("../../models/transaction.model");
const factory = require("../handlerFactory");

exports.getOneTransaction = factory.getOne(Transaction);
exports.getAllOrganizationTransaction = factory.getAll(
  Transaction,
  "addOrganization"
);
exports.getAllTransaction = factory.getAll(Transaction);
