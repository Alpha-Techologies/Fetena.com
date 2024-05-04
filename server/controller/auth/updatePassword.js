const User = require("../../models/user.model");
// const jwt = require("jsonwebtoken");
const catchAsync = require("../../utils/catchAsync");
const APIError = require("../../utils/apiError");
const { StatusCodes } = require("http-status-codes");

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password } = req.body;

  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTED current password is correct
  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    return next(
      new APIError("Your current password is wrong.", StatusCodes.UNAUTHORIZED)
    );
  }

  // 3) If so, update password
  user.password = password;
  user.passwordConfirm = password; //undefined

  await user.save();

  // 4) Log user in, send JWT
  // createSendToken(user, StatusCodes.OK, res);
  res.status(StatusCodes.CREATED).json({
    status: "success",
  });
});
