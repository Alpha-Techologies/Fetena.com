const morgan = require("morgan");
const logger = require("./logger");

const morganHTTP = morgan("combined", {
  stream: { write: (message) => logger.http(message.trim()) },
});
module.exports = morganHTTP;
