const factory = require("../handlerFactory");
const Notification = require("../../models/notification.model");
const catchAsync = require("../../utils/catchAsync");

const getNotification = factory.getAll(Notification);

const addOptionToBody = catchAsync((req, res, next) => {
  req.body.option = { user: req.user.id };
});

module.exports = {
  getNotification,
  addOptionToBody,
};
