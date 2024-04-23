const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const APIError = require("./utils/apiError");
const globalErrorHandler = require("./controller/errorController");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean") // remove the html tags that are needed
const hpp = require("hpp");
const cookieParser = require('cookie-parser')
require("dotenv").config({
  path: "./config.env"
});

const limiter = rateLimit({
  max: 100,
  windiwMs: 60 * 60 * 10000,
  message:
    "Too many requests have been coming in from this IP, pleasve try again in an hour",
});
const methodOverride = require("method-override");

app.use(cookieParser(process.env.JWT_SECRET))
// app.set('trust proxy', true)
app.use(helmet());

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(xss())
app.use(mongoSanitize({ allowDots: true }));
app.use(
  hpp()

);

app.use(methodOverride("_method"));

//Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("../public"));


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/", limiter);

app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();
  next();
});


const userRouter = require("./routes/userRoutes");
const { signedCookies } = require("cookie-parser");
// const roomRouter = require("./routes/roomRoutes");

app.use("/users", userRouter);
// app.use("/rooms", roomRouter);

app.all("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} in server plus`, 404));
});

app.use(globalErrorHandler);

module.exports = app;