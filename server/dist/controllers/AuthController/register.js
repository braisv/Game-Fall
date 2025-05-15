"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const types_1 = require("../../utils/types");
const variables_1 = require("../../utils/variables");
exports.register = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const { username, password, ...userRequested } = req.body;
    if (!username || !password) {
        throw new AppError_1.ValidationError('You must provide valid credentials');
    }
    const isExistinngUsername = await user_model_1.default.findOne({ username });
    if (isExistinngUsername) {
        throw new AppError_1.ValidationError('Username already exists');
    }
    const salt = bcrypt_1.default.genSaltSync(10);
    const hashPass = bcrypt_1.default.hashSync(password, salt);
    const userCreated = await user_model_1.default.create({
        ...userRequested,
        username,
        password: hashPass,
    });
    const { password: key, ...user } = userCreated;
    res.status(types_1.StatusCode.created).json({
        status: variables_1.StatusRequestSuccess,
        data: user,
    });
});
//# sourceMappingURL=register.js.map