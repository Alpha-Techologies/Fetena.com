const Organization = require("../../models/organization.model");
const catchAsync = require("../../utils/catchAsync");

exports.joinOrganization = catchAsync(async (req, res, next) => {
  const organizationId = req.params.id;
  const { userId } = req.user.id;
  const organization = await Organization.findOne({ _id: organizationId });

  if (!organization) {
    next(new APIError("Organization not found", Statuscodes.BAD_REQUEST));
  }

  const isUserAlreadyMember = organization.examiners.find(
    (examiner) => examiner.user.toString() === userId
  );

  if (!isUserAlreadyMember) {
    organization.examiners.push({ user: userId });
    await organization.save();
  }

  res.status(Statuscodes.OK).json({
    status: "success",
    message:
      "You have successfully requested to join the organization. Please wait for the admin to approve your request.",
  });
});
