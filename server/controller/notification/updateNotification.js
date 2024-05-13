const factory = require("../handlerFactory");
const Notification = require("../../models/notification.model");

const updateNotification = factory.updateOne(Notification);

module.exports = updateNotification;
