const express = require("express");
const {
  getAllOrganization,
  createOrganization,
  getOneOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controller/organization");
const { protect, restrictTo } = require("../controller/auth");

const organizationRouter = express.Router();

organizationRouter
  .route("/")
  .get(protect, getAllOrganization)
  .post(protect, createOrganization);

organizationRouter
  .route("/:id")
  .get(protect, getOneOrganization)
  .patch(protect, restrictTo(true), updateOrganization)
  .delete(protect, deleteOrganization);

module.exports = organizationRouter;
