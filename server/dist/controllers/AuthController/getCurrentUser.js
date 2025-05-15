"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const types_1 = require("../../utils/types");
exports.getCurrentUser = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    if (req.user) {
        const { password, ...user } = req.user;
        res.status(types_1.StatusCode.ok).json({ status: 'success', data: user });
    }
    else {
        next(new AppError_1.NotFoundError('No user logged in'));
    }
});
//# sourceMappingURL=getCurrentUser.js.map