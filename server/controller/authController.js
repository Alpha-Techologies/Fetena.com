// const crypto = require("crypto");
const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const APIError = require("../utils/apiError");
// const factory = require("../controller/handlerFactory");
const Email = require("./../utils/sendMail");
const { isTokenValid } = require("../utils/jwt");

const {
  forgetPassword,
  resetPassword,
  updatePassword,
} = require("../controller/auth");
const { StatusCodes } = require("http-status-codes");

// const signToken = (id) => {
//   return jwt.sign(
//     {
//       id,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     }
//   );
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
//   if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

//   res.cookie("jwt", token, cookieOptions);

//   // Remove password from output
//   user.password = undefined;

// // Only for rendered pages, no errors!
// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       // 1) verify token
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );

//       // 2) Check if user still exists
//       const currentUser = await User.findById(decoded.id);
//       if (!currentUser) {
//         return next();
//       }

//       // 3) Check if user changed password after the token was issued
//       if (currentUser.changedPasswordAfter(decoded.iat)) {
//         return next();
//       }

//       // THERE IS A LOGGED IN USER
//       res.locals.user = currentUser;
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }
//   next();
// };

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on POSTed email
//   const { email } = req.body;
//   console.log({ email });
//   const user = await User.findOne({
//     email,
//   });
//   // console.log({ user });
//   if (!user) {
//     return next(new APIError("There is no user with email address.", 404));
//   }

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({
//     validateBeforeSave: false,
//   });
//   console.log("second");
//   // 3) Send it to user's email
//   const resetURL = `https://${"localhost:3000"}/resetpassword/${resetToken}`;

//   // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

//   try {
//     await new Email(user, resetURL).sendPasswordReset();
//     console.log(resetURL);

//     res.status(200).json({
//       status: "success",
//       message: resetToken,
//       //       message: 'Token sent to email!'//remove from sending the token
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({
//       validateBeforeSave: false,
//     });
//     console.log(err);

//     return next(
//       new APIError("There was an error sending the email. Try again later!"),
//       500
//     );
//   }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on the token
//   const { password, confirmPassword } = req.body;
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: {
//       $gt: Date.now(),
//     },
//   });

//   // 2) If token has not expired, and there is user, set the new password
//   if (!user) {
//     return next(new APIError("Token is invalid or has expired", 400));
//   }

//   if (password !== confirmPassword)
//     return next(new APIError("Password's that you entered do not match", 400));

//   user.password = password;

//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   createSendToken(user, 200, res);
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   const { passwordCurrent, password } = req.body;

//   // 1) Get user from collection
//   const user = await User.findById(req.user.id).select("+password");

//   // 2) Check if POSTED current password is correct
//   if (!(await user.correctPassword(passwordCurrent, user.password))) {
//     return next(new APIError("Your current password is wrong.", 401));
//   }

//   // 3) If so, update password
//   user.password = password;
//   // user.passwordConfirm = passwordConfirm; //undefine
//   await user.save();

//   // 4) Log user in, send JWT
// createSendToken(user, 200, res);
// });
