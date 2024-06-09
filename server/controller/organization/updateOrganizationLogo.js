const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const Organization = require("../../models/organization.model");
const { fileUpload } = require("../profile/fileUpload");
const { logActivity } = require("../../utils/logActivity");

exports.updateOrganizationLogo = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next(new APIError("There is no file", StatusCodes.BAD_REQUEST));
  }

  const orgLogo = req.files.logo;
  const orgId = req.params.id;

  if (!orgLogo.mimetype.startsWith("image")) {
    return next(
      new APIError("Please upload a Proper Logo", StatusCodes.BAD_REQUEST)
    );
  }

  const organization = await Organization.findOne({ _id: orgId });

  if (!organization) {
    return next(
      new APIError("Organization does not exist", StatusCodes.BAD_REQUEST)
    );
  }

  const logo = await fileUpload({
    file: orgLogo,
    name: `organizationLogo_` + organization._id,
    filePath: "organizationsLogo",
    maxSize: 1024 * 1024,
  });

  if (typeof logo != "string") next(logo);

  organization.logo = logo;
  await organization.save();

  req.organization = orgId;
  await logActivity(req, 1, { name: "Organization", id: organization.id });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: null,
  });
});
