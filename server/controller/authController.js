// const crypto = require("crypto");
const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const APIError = require("../utils/apiError");
// const factory = require("../controller/handlerFactory");
const Email = require("./../utils/sendMail");
const { isTokenValid } = require("../utils/jwt");



exports.signUp = catchAsync(async (req, res, next) => {
  
  const { email, password } = req.body;
  // console.log("sign up")

  const user = await User.findOne({
    email,
  });
  if (user) {
    console.log("signup");
    return next(new APIError(`Email already registered`, 400));
  }

  // req.body.activationToken = 
  const newUser = await new User(req.body);
  if (!newUser) {
    return next(new APIError(`User cannot be created at the moment`, 400));
  }

  // await user.save({
  //   validateBeforeSave: false,
  // });

  await newUser.save();

  //verification steps
  const activationToken = newUser.createActivationToken();
  await newUser.save({
    validateBeforeSave: false,
  });
  

  // await newUser.save();

  const activationURL = `https://${"localhost:3000"}/activate/${activationToken}`;

  try {
    await new Email(newUser, activationURL).sendPasswordReset();
    console.log(activationURL);

    res.status(200).json({
      status: "success",
      message: activationToken,
      //       message: 'Token sent to email!'//remove from sending the token
    });
  } catch (err) {
    newUser.activationToken = undefined;
    newUser.activationTokenExpires = undefined;
    await newUser.save({
      validateBeforeSave: false,
    });
    console.log(err);

    return next(
      new APIError("There was an error sending the email. Try again later!"),
      500
    );
  }
  // createSendToken(newUser, 200, res);
  // res.end();
});


exports.logout = catchAsync(async (req, res, next) => {

  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    console.log(payload.refreshToken, payload.user._id, "here");

    const userId = new ObjectId(payload.user._id);
    const existingToken = await TokenModel.findOne({
      user: userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new Error("Invalid token or session expired");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication Invalid! No logged in session" });
  }
});

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

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log("role: " + req.user.role);
    // roles ['admin', 'lead-guide'].role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new APIError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const { email } = req.body;
  console.log({ email });
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
  console.log("second");
  // 3) Send it to user's email
  const resetURL = `https://${"localhost:3000"}/resetpassword/${resetToken}`;

  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await new Email(user, resetURL).sendPasswordReset();
    console.log(resetURL);

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

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const { password, confirmPassword } = req.body;
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new APIError("Token is invalid or has expired", 400));
  }

  if (password !== confirmPassword)
    return next(new APIError("Password's that you entered do not match", 400));

  user.password = password;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.activateAccount = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  // const { password, confirmPassword } = req.body;
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    activationToken: hashedToken,
    activationTokenExpires: {
      $gt: Date.now(),
    },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new APIError("Token is invalid or has expired", 400));
  }

  // if (password !== confirmPassword)
  //   return next(new APIError("Password's that you entered do not match", 400));

  // user.password = password;

  user.activationToken = undefined;
  user.activationTokenExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password } = req.body;

  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTED current password is correct
  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    return next(new APIError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = password;
  // user.passwordConfirm = passwordConfirm; //undefine
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});