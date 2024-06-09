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
  organizationStaff,
  leaveOrganization,
} = require("../controller/organization");
const { protect, restrictTo } = require("../controller/auth");

const organizationRouter = express.Router();

organizationRouter
  .route("/")
  .get(protect, getAllOrganization)
  .post(protect, createOrganization);

organizationRouter.route("/staff/:id").get(protect, organizationStaff);

organizationRouter
  .route("/:id")
  .patch(protect, restrictTo(true), updateOrganization)
  .get(protect, getOneOrganization)
  .delete(protect, deleteOrganization);

organizationRouter
  .route("/updateLogo/:id")
  .patch(protect, restrictTo(true), updateOrganizationLogo);

organizationRouter.route("/join/:id").post(protect, joinOrganization);
organizationRouter.route("/leave/:id").post(protect, leaveOrganization);

organizationRouter
  .route("/activate/:id")
  .post(protect, restrictTo(true), activateExaminer);

organizationRouter
  .route("/deactivate/:id")
  .post(protect, restrictTo(true), deactivateExaminer);

module.exports = organizationRouter;
