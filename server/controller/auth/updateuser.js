const User = require("../../models/user.model");
const factory = require("../handlerFactory");

exports.updateUser = factory.updateOne(User);
