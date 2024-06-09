const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const Notification = require("../../models/notification.model");
const OrganizationExaminer = require("../../models/organization.examiner.model");

exports.joinOrganization = catchAsync(async (req, res, next) => {
  const organizationId = req.params.id;
  const userId = req.user.id;
  const organization = await Organization.findOne({ _id: organizationId });

  if (!organization) {
    next(new APIError("Organization not found", StatusCodes.BAD_REQUEST));
  }

  // user is the admin
  if (organization.adminUser.toString() === userId) {
    return next(
      new APIError(
        "You are the admin of this organization",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const isUserAlreadyMember = await OrganizationExaminer.findOne({
    organization: organizationId,
    user: userId,
  });


  if (isUserAlreadyMember) {
    return next(
      new APIError(
        "You are already a member of this organization or have requested to be so.",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  await OrganizationExaminer.create({
    user: userId,
    organization: organizationId,
  });

  let adminUserId = organization.adminUser.toString();

  await Notification.create({
    user: adminUserId,
    message: `User with id ${userId} has requested to join the organization `,
  });

  req.organization = organizationId
  await logActivity(req,7,{name:'Organization',id:organization.id} )

  res.status(StatusCodes.OK).json({
    status: "success",
    message:
      "You have successfully requested to join the organization. Please wait for the admin to approve your request.",
  });
});

