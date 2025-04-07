require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const logger = require("morgan");
const authRouter = require("./routes/auth");
const gameRouter = require("./routes/games");
const dbRouter = require("./routes/db");
const userRouter = require("./routes/user");
const { handleMongoError, errorHandler } = require("./middlewares/errorHandler");
const { NotFoundError } = require("./utils/AppError");

const { MONGO_URL } = process.env;
mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to Mongo`);
    // console.log(`Connected to Mongo on ${MONGO_URL}`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);

const app = express();

// Middleware Setup
app.use(logger("dev"));
var whitelist = ["http://localhost:3000", "http://localhost:5000", "https://gamesfall.herokuapp.com"];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware Setup
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: "react auth passport secret shh",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 2419200000,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
require("./passport")(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.locals.title = "Backend Games Fall";

app.use("/api/auth", authRouter);
app.use("/api/db", dbRouter);
app.use("/api/games", gameRouter);
app.use("/api/user", userRouter);

// app.use((req, res, next) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

app.all("*", (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

app.use((err, req, res, next) => {
  if (err.name === "MongoError" || err.name === "ValidationError") {
    err = handleMongoError(err);
  }
  errorHandler(err, req, res, next);
});

module.exports = app;
