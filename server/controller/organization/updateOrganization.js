// const factory = require("../handlerFactory");
// const Organization = require("../../models/organization.model");

// exports.updateOrganization = factory.updateOne(Organization);
const factory = require("../handlerFactory");
const Organization = require("../../models/organization.model");

exports.updateOrganization = function () {
  return factory.updateOne(Organization);
};