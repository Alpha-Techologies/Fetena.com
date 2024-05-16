const express = require("express");
const notificationRouter = express.Router();

const {
  getNotification,
  updateNotification,
  addOptionToBody,
  authorizeNotificationUpdate,
} = require("../controller/notification/index");
const { protect } = require("../controller/auth");

notificationRouter
  .route("/")
  .get(protect, addOptionToBody, getNotification)

notificationRouter
  .route("/:id")
  .patch(protect, authorizeNotificationUpdate, updateNotification);

module.exports = notificationRouter;
