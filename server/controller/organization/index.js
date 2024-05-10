const { createOrganization } = require("./createOrganization");
const { deleteOrganization } = require("./deleteOrganization");
const { updateOrganization } = require("./updateOrganization");
const { getOneOrganization, getAllOrganization } = require("./getOrganization");
const { activateExaminer } = require("./activateExaminer");
const { deactivateExaminer } = require("./deactivateExaminer");
const { joinOrganization } = require("./joinOrganization");
const { updateOrganizationLogo } = require("./updateOrganizationLogo");

module.exports = {
  createOrganization,
  deleteOrganization,
  updateOrganization,
  getOneOrganization,
  getAllOrganization,
  activateExaminer,
  deactivateExaminer,
  joinOrganization,
  updateOrganizationLogo,
};
