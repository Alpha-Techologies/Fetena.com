const User = require("../../models/userModel");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const Email = require("../../utils/sendMail");
const { StatusCodes } = require("http-status-codes");

exports.signUp = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });
  if (user) {
    return next(
      new APIError(`Email already registered`, StatusCodes.BAD_REQUEST),
    );
  }

  // req.body.activationToken =
  const newUser = await new User(req.body);
  
  if (!newUser) {
    return next(
      new APIError(
        `User cannot be created at the moment`,
        StatusCodes.BAD_REQUEST,
      ),
    );
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

  const activationURL = `http://${"localhost:4000"}/activate?token=${activationToken}&email=${email}`;

  try {
    await new Email(newUser, activationURL).sendPasswordReset();
    console.log(activationURL);

    res.status(StatusCodes.CREATED).json({
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
      500,
    );
  }
  // createSendToken(newUser, 200, res);
  // res.end();
});
