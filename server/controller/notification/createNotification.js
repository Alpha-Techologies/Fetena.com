const factory = require("../handlerFactory");
const Notification = require("../../models/notification.model");
const catchAsync = require("../../utils/catchAsync");

const createNotification = factory.createOne(Notification);

const addUserToBody = catchAsync((req, res, next) => {
  req.body.user = req.user.id;
  next();
});

module.exports = { createNotification, addUserToBody };
