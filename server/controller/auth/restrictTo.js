const {StatusCodes} = require("http-status-codes");
const APIError = require("../../utils/apiError");


exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log("role: " + req.user.role);
    // roles ['admin', 'lead-guide'].role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new APIError(
          "You do not have permission to perform this action",
          StatusCodes.FORBIDDEN,
        ),
      );
    }
    next();
  };
};
