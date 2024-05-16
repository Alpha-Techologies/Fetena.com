const catchAsync = require("../utils/catchAsync");

const addoptionsToBody = (options) =>
  catchAsync(async (req, res, next) => {
    if (options === "notify") req.body.options = { user: req.user.id };
    if (options === "staff") req.body.options = { organization: req.params.id };
    next();
  });

module.exports = addoptionsToBody;
