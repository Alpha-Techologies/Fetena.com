const User = require("../../models/user.model");
// const jwt = require("jsonwebtoken");
const catchAsync = require("../../utils/catchAsync");
const APIError = require("../../utils/apiError");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const { password, confirmPassword } = req.body;
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new APIError("Token is invalid or has expired", StatusCodes.BAD_REQUEST));
  }

  if (password !== confirmPassword)
    return next(new APIError("Password's that you entered do not match", StatusCodes.BAD_REQUEST));

  user.password = password;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
  });

  // createSendToken(user, 200, res);
});
