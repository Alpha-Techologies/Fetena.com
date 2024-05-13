const factory = require("../handlerFactory");
const Notification = require("../../models/notification.model");

const getNotification = factory.getAll(Notification, { user: req.user.id });


module.exports = getNotification;