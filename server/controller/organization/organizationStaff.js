const OrganizationExaminer = require("../../models/organization.examiner.model");
const factory = require("../handlerFactory");

const organizationStaff = factory.getAll(
  OrganizationExaminer,
  "addOrganization"
);

// const

module.exports = organizationStaff;
