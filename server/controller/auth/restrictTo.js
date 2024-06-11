const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/apiError");
const User = require("../../models/user.model");
const Organization = require("../../models/organization.model");

// roles -> ["sysAdmin", "orgAdmin"]
exports.restrictTo = (isOrgOperation) => {
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });

    if (user.isSystemAdmin) next();

    if (isOrgOperation) {
      // use the find function to create req.params.id and admin.toString()
      const org = await Organization.findOne({ _id: req.params.id });
      if (!org) {
        return next(
          new APIError("Organization Does not Exist", StatusCodes.BAD_REQUEST)
        );
      }

      const isadmin = org.adminUser.toString() === req.user.id;
      if (isadmin) return next();
    }
    return next(
      new APIError(
        "You do not have permission to perform this action",
        StatusCodes.FORBIDDEN
      )
    );
  };
};
