import { IUser } from "../models/user.model";

const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

const validateExistingUser = async (user: IUser, password: string) => {
  if (!user) {
    return false;
  }

  return await bcrypt.compare(`${password}`, user.password);
};

const localStrategy = new LocalStrategy(function verify(
  username: string,
  password: string,
  cb: (...args: any) => void,
) {
  User.findOne({username}, async (err: Error, obj: IUser) => {
    if (err) {
      return cb(err);
    }

    const isUserValidated = await validateExistingUser(obj, password);

    if (!isUserValidated) {
      return cb(null, false, {
        message:
          'Invalid username or password. Please enter valid credentials.',
      });
    }

    return cb(null, obj);
  });
});

const serializeUser = (user: IUser, cb: (...args: any) => void) => {
  process.nextTick(() => {
    cb(null, {id: user.id, username: user.username});
  });
};

const deserializeUser = (user: IUser, cb: (...args: any) => void) => {
  process.nextTick(() => {
    return cb(null, user);
  });
};

passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
