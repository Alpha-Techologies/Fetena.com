const express = require("express");
const notificationRouter = express.Router();

const {
  getNotification,
  updateNotification,
  addUserToBody,
  createNotification,
  addOptionToBody,
  authorizeNotificationUpdate,
} = require("../controller/notification/index");
const { protect } = require("../controller/auth");

notificationRouter
  .route("/")
  .get(protect, addUserToBody, getNotification)
  .post(protect, addUserToBody, createNotification);

notificationRouter
  .route("/:id")
  .patch(protect, authorizeNotificationUpdate, updateNotification);

module.exports = notificationRouter;
