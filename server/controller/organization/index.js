const {createOrganization} = require("./createOrganization");
const {deleteOrganization} = require("./deleteOrganization");
const {updateOrganization} = require("./updateOrganization");
const {getOneOrganization, getAllOrganization } = require("./getOrganization");

module.exports = {
  createOrganization,
  deleteOrganization,
  updateOrganization,
  getOneOrganization,
  getAllOrganization,
};
