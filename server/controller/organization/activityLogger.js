// utils/activityLogger.js
const { ActivityLog } = require('../../models/activityLog.model');
const catchAsync = require('../../utils/catchAsync');

exports.activityLogger = catchAsync( async ({ userId, organizationId, action, entity, entityId, details }) => {

    const organizationId = req.params.id;
    const userId = req.user.id;
    await ActivityLog.create({
      userId,
      organizationId
    });
   return next(
    new APIError(
      "You are the admin of this organization",
      StatusCodes.BAD_REQUEST
    )
  );
});