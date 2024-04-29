const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../../utils/catchAsync");
const { attachCookiesToResponse, isTokenValid } = require("../../utils/jwt");
const APIError = require("../../utils/apiError");
const { TokenModel } = require("../../models/Token.model");

exports.protect = catchAsync(async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  console.log(refreshToken, accessToken);
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      req.params.id = payload.user.id;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const userId = payload.user.id;
    const existingToken = await TokenModel.findOne({
      user: userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      return next(
        new APIError(
          "Invalid token or session expired",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.user;
    req.params.id = payload.user.id;
    next();
  } catch (error) {
    return next(
      new APIError("Authentication Invalid", StatusCodes.UNAUTHORIZED)
    );
  }
});
