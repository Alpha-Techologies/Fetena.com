const morgan = require("morgan");
const logger = require("./logger");

// // Create a stream object with a 'write' function for morgan
// const morganStream = {
//   write: (message) => logger.http(message.trim())
// };

// // Configure morgan middleware
// morgan('combined', { stream: morganStream });

const morganHTTP = morgan("combined", {
  stream: { write: (message) => logger.http(message.trim()) },
});

// module.exports = morgan;
module.exports = morganHTTP;
