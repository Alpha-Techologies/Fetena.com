const factory = require("../handlerFactory");
const Notification = require("../../models/notification.model");

const getNotification = factory.getAll(Notification, "addUser");

module.exports = {
  getNotification,
};
