"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserWishList = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const user_model_1 = __importDefault(require("../../models/user.model"));
const types_1 = require("../../utils/types");
const variables_1 = require("../../utils/variables");
exports.getCurrentUserWishList = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const currentUser = req.user;
    if (!currentUser) {
        next(new AppError_1.UnauthorizedError('User is not logged in'));
    }
    const currentUserWithWishList = await user_model_1.default.findById(currentUser._id).populate('wishlist');
    console.log('GET USER WISHLIST:', { currentUserWithWishList });
    if (!currentUserWithWishList) {
        next(new AppError_1.NotFoundError('User not found'));
    }
    const { wishlist } = currentUserWithWishList || {};
    if (!wishlist || !wishlist.length) {
        res.status(types_1.StatusCode.noContent).json({ status: variables_1.StatusRequestSuccess, data: [] });
    }
    res.status(types_1.StatusCode.ok).json({ status: variables_1.StatusRequestSuccess, data: wishlist });
});
//# sourceMappingURL=getCurrentUserWishList.js.map