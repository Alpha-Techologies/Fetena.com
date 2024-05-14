const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const User = require("../../models/user.model");
const catchAsync = require("../../utils/catchAsync");
const factory = require("../handlerFactory");

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

  if (!orgLogo.mimetype.startsWith("image")) {
    return next(
      new APIError("Please upload a Proper Logo", StatusCodes.BAD_REQUEST)
    );
  }


  const doc = await Organization.create(newOrganization);

  const user = await User.findOne({ _id: userId });

  user.addAsAdmin(doc._id);

  // await user.save();

  res.status(StatusCodes.CREATED).json({
    sucess: true,
    data: doc,
  });
});