const factory = require("../handlerFactory");
const Organization = require("../../models/organization.model");

exports.deleteOrganization = factory.deleteOne(Organization);
