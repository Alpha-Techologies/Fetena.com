const factory = require("../handlerFactory");
const Organization = require("../../models/organization.model");

exports.getOneOrganization = factory.getOne(Organization);
exports.getAllOrganization = factory.getAll(Organization);
