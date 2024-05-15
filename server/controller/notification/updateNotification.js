const factory = require("../handlerFactory");
const Notification = require("../../models/notification.model");
const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../utils/catchAsync");

const updateNotification = factory.updateOne(Notification);

const authorizeNotificationUpdate = catchAsync(async (req, res, next) => {
  if (req.body.user !== req.user.id) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: "fail",
      message: "You are not authorized to update this notification",
    });
  }
  next();
});

module.exports = { updateNotification, authorizeNotificationUpdate };
