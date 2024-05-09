const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");

exports.joinOrganization = catchAsync(async (req, res, next) => {
  const organizationId = req.params.id;
  const userId = req.user.id;
  const organization = await Organization.findOne({ _id: organizationId });

  if (!organization) {
    next(new APIError("Organization not found", Statuscodes.BAD_REQUEST));
  }

  console.log(userId, organization.examiners);

  // user is the admin
  if (organization.adminUser.toString() === userId) {
    return next(
      new APIError(
        "You are the admin of this organization",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const isUserAlreadyMember = organization.examiners.find(
    (examiner) => examiner.user.toString() === userId
  );

  if (!isUserAlreadyMember) {
    organization.examiners.push({ user: userId });
    await organization.save();
  } else {
    return next(
      new APIError(
        "You are already a member of this organization or have requested to be so.",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message:
      "You have successfully requested to join the organization. Please wait for the admin to approve your request.",
  });
});
