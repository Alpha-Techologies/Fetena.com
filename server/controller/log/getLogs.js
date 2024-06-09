const Log = require("../../models/log.model");
const factory = require("../handlerFactory");

// const { TokenModel } = require("../../models/Token.model");
// const { UserModel } = require("../../models/User.model");
// const { isTokenValid } = require("../utils");

const getLogs = factory.getAll(Log);

module.exports = getLogs;

