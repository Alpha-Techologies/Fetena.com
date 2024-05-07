const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/organization.model");
const User = require("../../models/user.model");
const catchAsync = require("../../utils/catchAsync");
const factory = require("../handlerFactory");

exports.createOrganization = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const newOrganization = { adminUser: userId, ...req.body };

  const doc = await Organization.create(newOrganization);

  const user = await User.findOne({ _id: userId });

  user.addAsAdmin(doc._id);

  // await user.save();  

  res.status(StatusCodes.CREATED).json({
    sucess: true,
    data: doc,
  });
});
