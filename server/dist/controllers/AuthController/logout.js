"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const variables_1 = require("../../utils/variables");
exports.logout = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    try {
        res.clearCookie('connect.sid');
        req.logout(errorLogout => {
            if (errorLogout) {
                next(errorLogout);
            }
            req.session.destroy(errorDestroySession => {
                if (errorDestroySession) {
                    next(errorDestroySession);
                }
                res.status(204).json({ status: variables_1.StatusRequestSuccess, message: "User logged out successfully" });
            });
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=logout.js.map