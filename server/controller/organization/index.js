const {createOrganization} = require("./createOrganization");
const {deleteOrganization} = require("./deleteOrganization");
const {updateOrganization} = require("./updateOrganization");
const {getOneOrganization, getAllOrganization } = require("./getOrganization");
const { activateExaminee } = require("./activateExaminee");
const { deactivateExaminee } = require("./deactivateExaminee");
const { joinOrganization } = require("./joinOrganization");

module.exports = {
  createOrganization,
  deleteOrganization,
  updateOrganization,
  getOneOrganization,
  getAllOrganization,
  activateExaminee,
  deactivateExaminee,
  joinOrganization
};
