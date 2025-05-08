import dotenv from 'dotenv'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import connectMongo from 'connect-mongodb-session';
import { name as app_name} from "../package.json";
import cors from "cors";
import passport from "passport";
import logger from "morgan";
import authRouter from "./routes/auth";
import gameRouter from "./routes/games.js";
import igdbRouter from "./routes/igdbApi.js";
import userRouter from "./routes/user.js";
import { handleMongoError, errorHandler } from "./middlewares/errorHandler.js";
import { NotFoundError } from "./utils/AppError.js";
import "./services/passport.js";

dotenv.config()
const MongoStore = connectMongo(session);

const { MONGO_URL } = process.env;
mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL as string)
  .then(() => {
    console.log(`Connected to ${app_name} Mongo DB`);
  })
  .catch((err: Error) => {
    console.error(`Error connecting to ${app_name} Mongo DB`, err);
  });

// const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);

const app = express();

app.use(logger("dev"));
const whitelist = ["http://localhost:3000", "http://localhost:5000", "https://gamesfall.herokuapp.com"];
const corsOptions = {
  origin: function (origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin as string) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
} as cors.CorsOptions;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

const express_session = session({
  secret: `${app_name} react auth passport secret shh`,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  },
  store: new MongoStore({ uri: MONGO_URL as string, collection: 'Game Fall Session Store Collection'}),
})

app.use(express_session);
app.use(passport.initialize());
app.use(passport.authenticate("session"));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.locals.title = `Backend ${app_name}`;

app.use("/api/auth", authRouter);
app.use("/api/db", igdbRouter);
app.use("/api/games", gameRouter);
app.use("/api/user", userRouter);

app.all("*", (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

export default app;
