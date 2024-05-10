const express = require("express");
const {
  getAllOrganization,
  createOrganization,
  getOneOrganization,
  updateOrganization,
  deleteOrganization,
  activateExaminer,
  joinOrganization,
  deactivateExaminer,
  updateOrganizationLogo,
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

organizationRouter
  .route("/updateLogo/:id")
  .patch(protect, restrictTo(true), updateOrganizationLogo);

organizationRouter.route("/join/:id").post(protect, joinOrganization);

organizationRouter
  .route("/activate/:id")
  .post(protect, restrictTo(true), activateExaminer);

organizationRouter
  .route("/deactivate/:id")
  .post(protect, restrictTo(true), deactivateExaminer);

module.exports = organizationRouter;
