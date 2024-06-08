const factory = require("../handlerFactory");
const Notification = require("../../models/notification.model");
const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../utils/catchAsync");

const updateNotification = factory.updateOne(Notification);

const authorizeNotificationUpdate = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: "fail",
      message: "Notification not found",
    });
  }

  if (notification.user.toString() !== req.user.id) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: "fail",
      message: "You are not authorized to update this notification",
    });
  }
  next();
});

module.exports = { updateNotification, authorizeNotificationUpdate };
