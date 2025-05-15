"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_model_1 = __importDefault(require("../models/user.model"));
const validateExistingUser = async (user, password) => {
    if (!user) {
        return false;
    }
    return await bcrypt_1.default.compare(`${password}`, user.password);
};
const localStrategy = new passport_local_1.Strategy(function verify(username, password, cb) {
    user_model_1.default.findOne({ username }, async (err, obj) => {
        if (err) {
            return cb(err);
        }
        const isUserValidated = await validateExistingUser(obj, password);
        if (!isUserValidated) {
            return cb(null, false, {
                message: 'Invalid username or password. Please enter valid credentials.',
            });
        }
        return cb(null, obj);
    });
});
const serializeUser = (user, done) => {
    process.nextTick(() => {
        done(null, {
            id: user.id,
            username: user.username
        });
    });
};
const deserializeUser = (user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
};
passport_1.default.use(localStrategy);
passport_1.default.serializeUser(serializeUser);
passport_1.default.deserializeUser(deserializeUser);
//# sourceMappingURL=passport.js.map