const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/apiError");
const User = require("../../models/user.model");

// roles -> ["sysAdmin", "orgAdmin"]
exports.restrictTo = (isOrgOperation) => {
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });

    if (user.isSystemAdmin) next();

    if (isOrgOperation) {
      if (user.adminOf.includes(req.params.id)) return next();
    }
    return next(
      new APIError(
        "You do not have permission to perform this action",
        StatusCodes.FORBIDDEN
      )
    );
  };
};
