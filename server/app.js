const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const APIError = require("./utils/APIError");
const globalErrorHandler = require("./controller/errorController");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean"); // remove the html tags that are needed
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");

require("dotenv").config({
  path: "./.env",
});

const limiter = rateLimit({
  max: 100,
  windiwMs: 60 * 60 * 10000,
  message:
    "Too many requests have been coming in from this IP, please try again in an hour",
});
const methodOverride = require("method-override");

const fileUpload = require("express-fileupload");
// app.use(function(req, res,  next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// make the pulic folder accessable from the frontend
app.use(express.static("public"));

app.use(cookieParser(process.env.JWT_SECRET));
// app.set('trust proxy', true)
app.use(helmet());

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(xss());
app.use(mongoSanitize({ allowDots: true }));
app.use(hpp());

app.use(methodOverride("_method"));

app.use(fileUpload());

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


const initSocket = require("./sockets");
// socket.io

const server = require("http").createServer(app);

// specifiy the port for connection for the socket
const router = require("./routes/routes");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

server.listen(3000);
//intialize the socket
initSocket(io);

app.use("/api", router);

app.all("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} in server plus`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
