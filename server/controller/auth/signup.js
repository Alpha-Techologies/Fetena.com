const User = require("../../models/userModel");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const Email = require("../../utils/sendMail");
const { StatusCodes } = require("http-status-codes");
const { fileUpload } = require("./../profile/fileUpload")

exports.signUp = catchAsync(async (req, res, next) => {

  if (!req.files) {
    return next(new APIError("There is no file", 404));
  }
  if (!req.body.data ) {
    return next(new APIError("There is no user data", 404));
  }

  const parsedBody = JSON.parse(req.body.data);
  const { email } = parsedBody

  const profilePhoto = req.files.profilePhoto;
  const idPhoto = req.files.idPhoto;

  if (!profilePhoto.mimetype.startsWith("image")) {
    return next(new APIError("Please a Proper Profile Photo", StatusCodes.BAD_REQUEST));
  }

  if (!idPhoto.mimetype.startsWith("image")) {
    return next(new APIError("Please a Proper ID Photo", StatusCodes.BAD_REQUEST));
  }
  

  const user = await User.findOne({
    email
  });

  if (user) {
    return next(
      new APIError(`Email already registered`, StatusCodes.BAD_REQUEST),
    );
  }

  let newUser = await new User(parsedBody);
  
  if (!newUser) {
    return next(
      new APIError(
        `User cannot be created at the moment`,
        StatusCodes.BAD_REQUEST,
      ),
    );
  }

  newUser.profilePhoto = await fileUpload({
    file:profilePhoto,
    name: `profilePhoto_`+email,
    filePath:"profiles",
    maxSize: 1024 * 1024,
  });
  newUser.idPhoto = await fileUpload({
    file:idPhoto,
    name: `idPhoto_`+email,
    filePath:"profiles",
    maxSize: 1024 * 1024,

  });

  //activationToken
  const activationToken = newUser.createActivationToken();

  await newUser.save();

  const activationURL = `http://${"localhost:4000"}/activate?token=${activationToken}&email=${email}`;

  try {
    await new Email(newUser, activationURL).sendPasswordReset();
    console.log(activationURL);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: activationToken,
    });
  } catch (err) {

    newUser.activationToken = undefined;
    newUser.activationTokenExpires = undefined;
    await newUser.save({
      validateBeforeSave: false,
    });

    return next(
      new APIError("There was an error sending the email. Try again later!"),
      500,
    );
  }
});
