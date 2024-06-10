const catchAsync = require("../../utils/catchAsync");

exports.getOrganizationId = catchAsync(async (req, res, next) => {
  console.log({ id: req.params.id });
  req.organization = req.params.id;
  next();
});
