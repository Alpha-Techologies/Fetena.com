const factory = require("../handlerFactory");
const Notification = require("../../../models/notification.model");

const createNotification = factory.createOne(Notification);

const addUserToBody = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};


module.exports = { createNotification, addUserToBody };