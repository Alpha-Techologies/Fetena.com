const { activateAccount } = require("./activateAccount");
const { forgotPassword } = require("./forgotPassword");
const { login } = require("./login");
const { logout } = require("./logout");
const { protect } = require("./protect");
const { resetPassword } = require("./resetPassword");
const { restrictTo } = require("./restrictTo");
const { signUp } = require("./signup");
const { updatePassword } = require("./updatePassword");

module.exports = {
  forgotPassword,
  resetPassword,
  updatePassword,
  login,
  protect,
  logout,
  restrictTo,
  signUp,
  activateAccount
}
