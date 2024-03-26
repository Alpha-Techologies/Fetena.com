const APIError = require("./../utils/apiError");

const handleFileNotFound = (err) => {
  const message = `File not found`;
  return new APIError(message, 400);
}

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path},${err.value}`;
  return new APIError(message, 400);
};

const handleDuplicateDB = (err) => {
  //const value  = err.errmsg.match(/(["'])(\\?.)*?\1/);
  //console.log(value)
  const message = `Duplicate field value. Please use another value `;
  return new APIError(message, 400);
};

const handleValidatonDB = (err) => {
  console.log("gotcha")
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new APIError(message, 400);
};

const handleJWTTokenError = (err) =>
  new APIError("You are not login. Please login!", 401);

const handleTokenExpiredError = (err) =>
  new APIError("Your Token has been expired. Please Login Again!", 401);

const handleInvalidFieldError = (err) =>
  new APIError("Invalid input in your field. Please try again with a different input", 400)

const errorOnpro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      message: "Something is wrong",
    });
  }
};
const errorOndev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = async (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    errorOndev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log(err.message + 9090)
    let error = {
      ...err
    };
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateDB(error);
    // if (err._message = "rock validation failed") error = handleValidatonDB(error);
    if (err.name === "ValidationError") error = handleValidatonDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTTokenError(error);
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError(error);
    if (err.message.startsWith("SyntaxError")) error = handleValidatonDB(error);
    if (err.message.startsWith("FileNotFound")) error = handleFileNotFound(error);

    if (error.message === undefined) return errorOnpro(err, res);

    errorOnpro(error, res);
  }
  // const session = req.body.session
  // console.log("SESSION " + session)
  // await req.body.session.abortTransaction()
};