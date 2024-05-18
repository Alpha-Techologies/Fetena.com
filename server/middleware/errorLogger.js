// const { StatusCodes } = require("http-status-codes");
// const logger = require("../utils/logger.js");
// const APIError = require("../utils/apiError.js");

// const converter = (err, req, res, next) => {
//     if (!(err instanceof APIError)) {
//         const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
//         const message = err.message || StatusCodes[status];
//         const apiError = new APIError(message, status, false);
//         apiError.stack = err.stack;
//         apiError.message = [{ message: err.message }];
//         return next(apiError);
//     }
//     err.message = [{ message: err.message }];
//     return next(err);
// };

// const notFound = (req, res, next) => {
//     return next(
//         new APIError(StatusCodes[StatusCodes.NOT_FOUND], StatusCodes.NOT_FOUND)
//     );
// };

// const handler = (err, req, res, next) => {
//     // Ensure error status and message are properly set
//     let status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
//     let message = err.message || StatusCodes[status];

//     // Log the error stack using the logger
//     logger.error(`Status: ${status}, Message: ${message}, Stack: ${err.stack || 'No stack trace available'}`);

//     // Modify the response for production and development environments
//     if (process.env.NODE_ENV === "production") {
//         status = StatusCodes.INTERNAL_SERVER_ERROR;
//         message = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR];
//     }

//     return res.status(status).json({
//         status: status,
//         errors: message,
//         ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//     });
// };

// module.exports = { converter, notFound, handler };

const { StatusCodes } = require("http-status-codes");
const logger = require("../utils/logger");
const APIError = require("../utils/apiError");

const converter = (err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || StatusCodes[status];
    const apiError = new APIError(message, status);
    apiError.stack = err.stack;
    apiError.message = [{ message: err.message }];
    return next(apiError);
  }
  err.message = [{ message: err.message }];
  return next(err);
};

const notFound = (req, res, next) => {
  return next(
    new APIError(StatusCodes[StatusCodes.NOT_FOUND], StatusCodes.NOT_FOUND)
  );
};

const handler = (err, req, res, next) => {
  let status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || StatusCodes[status];

  if (process.env.NODE_ENV === "production") {
    status = StatusCodes.INTERNAL_SERVER_ERROR;
    message = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR];
  }

  // Log the error stack using the logger
  logger.error(
    `Status: ${status}, Message: ${message}, Stack: ${
      err.stack || "No stack trace available"
    }`
  );

  return res.status(status).json({
    status: status,
    errors: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { converter, notFound, handler };
