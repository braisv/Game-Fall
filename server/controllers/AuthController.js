const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const ErrorHandler = require("../middlewares/errorHandler");
const { UnauthorizedError } = require("../utils/AppError");
const catchAsync = ErrorHandler.catchAsync;

module.exports = {
  register: catchAsync(async (req, res, next) => {
    const { username, password, name, surname, email, phone } = req.body;

    if (!username || !password) {
      throw new ValidationError("You must provide valid credentials");
    }

    const isExistinngUsername = await User.findOne({ username });

    if (isExistinngUsername) {
      throw new ValidationError("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const user = await User.create({
      username,
      name,
      surname,
      email,
      phone,
      password: hashPass,
    });

    res.status(201).json({
      status: "success",
      data: { user },
    });
  }),
  login: catchAsync(async (req, res, next) => {
    console.log("LOGIN", { body: req.body });
    console.log({ nodeEnv: process.env.NODE_ENV });
    const { username } = req.body;

    const user = await User.findOne({ username });
    console.log("USER: ", { user });
    if (!user) {
      console.log("THROW ERROR - no user");
      throw new UnauthorizedError("Invalid credentials. Please try again using valid credentials.");
    }

    console.log("CHECK PASSWORD");

    const isPasswordValid = await bcrypt.compare(`${req.body.password}`, user.password);

    if (!isPasswordValid) {
      console.log("THROW ERROR - no password");
      throw new UnauthorizedError("Invalid credentials. Please try again using valid credentials.");
    }

    console.log({ user });

    const { password, ...user_data } = user._doc;

    passport.authenticate("local", async (err, theUser, failureDetails) => {
      console.log("PASSPORT", { err, theUser, failureDetails });
      // Check for errors
      if (err) next(new Error("Something went wrong"));
      if (!theUser) next(failureDetails);

      // Return user and logged in
      const passportUser = await new Promise((resolve, reject) => {
        req.login(theUser, (error) => {
          if (error) {
            console.log("REQ LOGIN ERROR");
            reject(new Error("Something went wrong"));
          } else {
            resolve(user);
          }
        });
      });

      res.status(200).json({
        status: "success",
        data: { user: passportUser },
      });
    })(req, res, next);
  }),
};
