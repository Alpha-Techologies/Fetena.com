const { TokenModel } = require("../../models/Token.model");
const catchAsync = require("../../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");

exports.logout = catchAsync(async (req, res, next) => {
  // res.cookie("jwt", "loggedout", {
  //   expires: new Date(Date.now() + 10 * 1000),
  //   httpOnly: true,
  // });
  await TokenModel.findOneAndDelete({ user: req.user._id });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  // res.status(StatusCodes.OK).json({ msg: "user logged out!" });
  res.status(StatusCodes.OK).json({
    status: "success",
    data: null,
  });
});
