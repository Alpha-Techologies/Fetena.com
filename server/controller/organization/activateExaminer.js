const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const OrganizationExaminer = require("../../models/organization.examiner.model");
const Notification = require("../../models/notification.model");
const { logActivity } = require("../../utils/logActivity");

exports.activateExaminer = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const organizationId = req.params.id;

  const organization = await Organization.findOne({ _id: organizationId });

  if (!organization) {
    next(new APIError("Organization not found", StatusCodes.BAD_REQUEST));
  }

  // if the user is activating itself
  if (organization.adminUser.toString() === userId) {
    return next(
      new APIError(
        "You are the admin of this organization",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const organizationExaminer = await OrganizationExaminer.findOne({
    organization: organizationId,
    user: userId,
  });

  if (!organizationExaminer) {
    return next(
      new APIError(
        "User is not a member of this organization",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  organizationExaminer.status = "activated";

  // save the organization Examiner
  await organizationExaminer.save();

  await Notification.create({
    user: userId,
    message: `Your account as an Examiner has been Activated. In the Organization ${organization.name}`,
  });

  req.organization = organizationId
  await logActivity(req,6,{name:'Organization Examiner',id:user.id} )


  res.status(StatusCodes.OK).json({
    status: "success",
    message: "You have successfully approved the join request.",
  });
});
