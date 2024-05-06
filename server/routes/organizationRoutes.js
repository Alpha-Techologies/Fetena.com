const express = require("express");
const {
  getAllOrganization,
  createOrganization,
  getOneOrganization,
  updateOrganization,
  deleteOrganization,
  activateExaminee,
  joinOrganization,
  deactivateExaminee,
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

organizationRouter.route("/join").post(protect, joinOrganization);

organizationRouter
  .route("/activate")
  .post(protect, restrictTo(true), activateExaminee);

organizationRouter
  .route("/deactivate")
  .post(protect, restrictTo(true), deactivateExaminee);

module.exports = organizationRouter;
