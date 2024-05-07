const User = require("../../models/user.model");
// const jwt = require("jsonwebtoken");
const catchAsync = require("../../utils/catchAsync");
const APIError = require("../../utils/apiError");
const Email = require("../../utils/sendMail");


exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });
    // console.log({ user });
    if (!user) {
      return next(new APIError("There is no user with email address.", 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({
      validateBeforeSave: false,
    });

    // 3) Send it to user's email
    const resetURL = `http://${"localhost:4000"}/reset-password?token=${resetToken}`;
  
    // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      await new Email(user, resetURL).sendPasswordReset();
  
      res.status(200).json({
        status: "success",
        message: resetToken,
        //       message: 'Token sent to email!'//remove from sending the token
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({
        validateBeforeSave: false,
      });
      console.log(err);
  
      return next(
        new APIError("There was an error sending the email. Try again later!"),
        500
      );
    }
  });

