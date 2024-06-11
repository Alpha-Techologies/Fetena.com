const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const crypto = require("crypto");

exports.activateAccount = catchAsync(async (req, res, next) => {
  const { token, email } = req.body;

  if (!token || !email) {
    next(new APIError("Invalid Request", StatusCodes.BAD_REQUEST));
  }

  const verificationEmail = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({ email });

  if (!user) {
    next(
      new APIError(
        "Verification Failed. Email not found",
        StatusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  if (user.activationToken !== verificationEmail) {
    next(
      new APIError(
        "Verification Failed. Token is invalid",
        StatusCodes.UNAUTHORIZED
      )
    );
    return;
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.activationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ success: true, message: "Email verified" });
});
