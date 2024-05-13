const express = require("express");
const notificationRouter = express.Router();

const {
  getNotification,
  updateNotification,
  addUserToBody,
  createNotification,
} = require("../controller/notification/index");

notificationRouter.get("/", protect, getNotification);
notificationRouter.patch("/:id", protect, updateNotification);
notificationRouter.post("/", protct, addUserToBody, createNotification);

module.exports = notificationRouter;
