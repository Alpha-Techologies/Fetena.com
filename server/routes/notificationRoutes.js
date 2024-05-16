const express = require("express");
const notificationRouter = express.Router();

const {
  getNotification,
  updateNotification,
  authorizeNotificationUpdate,
} = require("../controller/notification/index");
const { protect } = require("../controller/auth");
const { addOptionToBody } = require("../middleware");

notificationRouter
  .route("/")
  .get(protect, addOptionToBody('notify'), getNotification)


notificationRouter
  .route("/:id")
  .patch(protect, authorizeNotificationUpdate, updateNotification);

module.exports = notificationRouter;
