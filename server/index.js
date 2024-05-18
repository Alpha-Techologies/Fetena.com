// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const db = require('./db')
// const movieRouter = require('./routes/movie-router')

// const app = express()
const logger = require("./utils/logger");
const app = require("./app");
const apiPort = 8080;

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
// app.use(bodyParser.json())

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const server = app.listen(apiPort, () =>
  logger.info(`Server running on port ${apiPort}`)
);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
