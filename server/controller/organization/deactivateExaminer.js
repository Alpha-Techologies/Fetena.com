const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const catchAsync = require("../../utils/catchAsync");

exports.deactivateExaminer = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const organizationId = req.params.id;

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

  organization.examiners.forEach((examiner) => {
    if (examiner.user.toString() === userId) {
      examiner.status = "inactive";
    }
  });

  // save the organization
  await organization.save();

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "You have successfully deactivated the examinee.",
  });
});
