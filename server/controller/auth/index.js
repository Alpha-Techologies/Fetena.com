const { forgotPassword } = require("./forgotPassword");
const { login } = require("./login");
const { resetPassword } = require("./resetPassword");
const { updatePassword } = require("./updatePassword");

module.exports = {
    forgotPassword,
    resetPassword,
    updatePassword,
    login
}