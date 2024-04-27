const catchAsync = require("./../utils/catchAsync");
const APIError = require("./../utils/apiError");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const factory = require("../controller/handlerFactory");

// const RockTemp = require("../models/rockTempModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//retrieves all editors
// restricted to admin
exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);
//retrieves editor profile
// restricted to the user himself
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getProfile = catchAsync(async (req, res, next) => {
  req.params.id = req.user.photo.id;
  next();
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
  req.filename = req.user.photo.filename;
  next()
});

exports.filterUserUpdateFields = (...allowedFields) => {
  return (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new APIError(
          "This route is not for password updates. Please use /updateMyPassword.",
          400
        )
      );
    }

    // Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, ...allowedFields, );
    // console.log(...allowedFields)
    // if (req.file) filteredBody.photo = req.file.filename;
    // req.body = filteredBody
    next()
  }
}

// update the users account
// restrict to the user-himself
exports.updateMe = factory.updateOne(User);

// update the users account type
// restrict to the admin
exports.toggleUserRole = factory.updateOne(User);

// returns the users edit history
// restrict to only the user
// exports.getMyEdits = factory.getAll(RockTemp)

// not required yet
// removes the users account
// restricted to the admin
exports.deleteUser = factory.deleteOne(User);

// delete the users account
// restrict to the user-himself
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});