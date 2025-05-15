"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const user_model_1 = __importDefault(require("../../models/user.model"));
const types_1 = require("../../utils/types");
const variables_1 = require("../../utils/variables");
exports.getUserById = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        next(new AppError_1.ValidationError('ID must be provided'));
    }
    const user = await user_model_1.default.findById(id);
    if (!user) {
        next(new AppError_1.NotFoundError('User not found by provided id'));
    }
    console.log('GET USER BY ID:', { user });
    res.status(types_1.StatusCode.ok).json({ status: variables_1.StatusRequestSuccess, data: user });
});
//# sourceMappingURL=getUserById.js.map