const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/apiError");
const createTokenUser = require("../../utils/createTokenUser");
const { attachCookiesToResponse } = require("../../utils/jwt");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/user.model");
const { TokenModel } = require("../../models/Token.model");
const crypto = require("crypto");



exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new APIError("Please provide email and password!", StatusCodes.BAD_REQUEST));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({
      email,
    }).select("+password");

    if(!user){
        return next(new APIError('User Not Found.', StatusCodes.NOT_FOUND))
    }
  
    if (!user.active){ return next(new APIError("Your have been deactivated, Please contact manager for further instructions", StatusCodes.UNAUTHORIZED))}

    if(!user.isVerified) {return next(new APIError("Your Account is not Activated.", StatusCodes.UNAUTHORIZED))}
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new APIError("Invalid Credentials", StatusCodes.UNAUTHORIZED));
    }


    // 3) If everything ok, send token to client
    const tokenUser = createTokenUser(user);

    let refreshToken = "";

    const existingToken = await TokenModel.findOne({ user: user._id });
  

    if (existingToken) {
      const { isValid } = existingToken;
  
      if (!isValid) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid token" });
      }
  
      refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: tokenUser, refreshToken });
      res.status(StatusCodes.OK).json({ user: tokenUser });
      return;
    }
  
    refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };
  
    await TokenModel.create(userToken);
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  
    res.status(StatusCodes.OK).json({ user: tokenUser });
  });
  


  exports.loginWithGoogle = catchAsync(async (req, res, next) => {

  })