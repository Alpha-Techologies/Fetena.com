const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const User = require("../../models/user.model");
const catchAsync = require("../../utils/catchAsync");
const factory = require("../handlerFactory");
const APIError = require("../../utils/apiError");
const { fileUpload } = require("../profile/fileUpload");
const OrganizationExaminer = require("../../models/organization.examiner.model");

exports.createOrganization = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next(new APIError("There is no file", StatusCodes.BAD_REQUEST));
  }

  if (!req.body.data) {
    return next(new APIError("There is no user data", StatusCodes.BAD_REQUEST));
  }

  const orgLogo = req.files.logo;
  const parsedBody = JSON.parse(req.body.data);
  const userId = req.user.id;
  parsedBody.adminUser = userId;

  if (!orgLogo.mimetype.startsWith("image")) {
    return next(
      new APIError("Please upload a Proper Logo", StatusCodes.BAD_REQUEST)
    );
  }

  const newOrganization = await Organization(parsedBody);

  // const user = await User.findOne({ _id: userId });

  // user.addAsAdmin(newOrganization._id);

  newOrganization.logo = await fileUpload({
    file: orgLogo,
    name: `organizationLogo_` + newOrganization._id,
    filePath: "organizationsLogo",
    maxSize: 1024 * 1024,
  });

  await newOrganization.save();
  // await user.save();

  //add user to the organization examiner
  const organizationExaminer = await OrganizationExaminer.create({
    organization: newOrganization._id,
    user: userId,
    userType: "admin",
    status: "activated",
  });


  res.status(StatusCodes.CREATED).json({
    sucess: true,
    data: { organization: newOrganization, admin: organizationExaminer },
  });
});
