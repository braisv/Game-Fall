import bcrypt from 'bcrypt';
import passport from 'passport';
import {Strategy} from 'passport-local';
import User, {IUser} from '../models/user.model';

const validateExistingUser = async (user: IUser, password: string) => {
  if (!user) {
    return false;
  }

  return await bcrypt.compare(`${password}`, user.password);
};

const localStrategy = new Strategy(
  async (username: string, password: string, cb: (...args: any) => void) => {
    await User.findOne({username}, async (err: Error, obj: IUser) => {
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
  },
);

const serializeUser = (user: any, done: (err: any, id?: any) => void) => {
  process.nextTick(() => {
    done(null, {
      id: user.id,
      username: user.username,
    });
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
