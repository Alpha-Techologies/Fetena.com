const { StatusCodes } = require("http-status-codes");
const OrganizationExaminer = require("../../models/organization.examiner.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");

const leaveOrganization = catchAsync(async (req, res, next) => {
  const user = req.user;

  const organizationExaminer = await OrganizationExaminer.findOne({
    user: user.id,
    organization: req.params.id,
  });

  if (!organizationExaminer) {
    return next(
      new APIError(
        "You are not a member of this organization",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  if (organizationExaminer.userType === "admin") {
    return next(
      new APIError("Admin cannot leave organization", StatusCodes.BAD_REQUEST)
    );
  }

  organizationExaminer.status = "deactivated";
  await OrganizationExaminer.save();

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = leaveOrganization;
