"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentUserCart = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const user_model_1 = __importDefault(require("../../models/user.model"));
const types_1 = require("../../utils/types");
const variables_1 = require("../../utils/variables");
exports.updateCurrentUserCart = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const currentUser = req.user;
    if (!currentUser) {
        next(new AppError_1.UnauthorizedError('User is not logged in'));
    }
    const { updatedUserObj } = req.body;
    if (!updatedUserObj) {
        next(new AppError_1.ValidationError('No data provided'));
    }
    const userToUpdate = await user_model_1.default.findByIdAndUpdate(currentUser._id, { $push: { cart: updatedUserObj } }, { new: true });
    res.status(types_1.StatusCode.ok).json({ status: variables_1.StatusRequestSuccess, data: userToUpdate });
});
//# sourceMappingURL=updateCurrentUserCart.js.map