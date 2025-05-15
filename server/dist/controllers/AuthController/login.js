"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const AppError_1 = require("../../utils/AppError");
const types_1 = require("../../utils/types");
const variables_1 = require("../../utils/variables");
const login = async (req, res, next) => passport_1.default.authenticate('local', (err, user, failureDetails) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return next(new AppError_1.UnauthorizedError(failureDetails.message));
    }
    req.login(user, error => {
        if (error) {
            return next(error);
        }
        return res
            .status(types_1.StatusCode.ok)
            .json({ status: variables_1.StatusRequestSuccess, data: user });
    });
})(req, res);
exports.login = login;
//# sourceMappingURL=login.js.map