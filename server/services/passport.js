const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

const validateExistingUser = async (user, password) => {
  if (!user) {
    return false;
  }

  return await bcrypt.compare(`${password}`, user.password);
};

const localStrategy = new LocalStrategy(function verify(username, password, cb) {
  User.findOne({ username }, async function (err, obj) {
    if (err) {
      return cb(err);
    }

    const isUserValidated = await validateExistingUser(obj, password);

    if (!isUserValidated) {
      return cb(null, false, { message: "Invalid username or password. Please enter valid credentials." });
    }

    return cb(null, obj);
  });
});

const serializeUser = (user, cb) => {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
};

const deserializeUser = (user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
};

passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
