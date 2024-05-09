const Organization = require("../../models/organization.model");
const catchAsync = require("../../utils/catchAsync");

exports.deactivateExaminer = catchAsync(async (req, res, next) => {
  const { organizationId, userId } = req.body;

  const organization = await Organization.findOne({ _id: organizationId });

  if (!organization) {
    next(new APIError("Organization not found", Statuscodes.BAD_REQUEST));
  }

  organization.examiners.forEach((examiner) => {
    if (examiner.user.toString() === userId) {
      examiner.status = "inactive";
    }
  });

  // save the organization
  await organization.save();

  res.status(Statuscodes.OK).json({
    status: "success",
    message: "You have successfully deactivated the examinee.",
  });
});
