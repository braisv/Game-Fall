"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("../controllers/UserController/index.js"));
const userRouter = express_1.default.Router();
userRouter.get('/currentUserCart', index_js_1.default.getCurrentUserCart);
userRouter.get('/updateCurrentUserWishList', index_js_1.default.getCurrentUserWishList);
userRouter.get('/:id', index_js_1.default.getUserById);
userRouter.post('/removeItemFromCurrentUserCart', index_js_1.default.removeItemFromCurrentUserCart);
userRouter.post('/removeItemFromCurrentUserWishList', index_js_1.default.removeItemFromCurrentUserWishList);
userRouter.post('/updateCurrentUserChart', index_js_1.default.updateCurrentUserCart);
userRouter.post('/updateCurrentUserWishList', index_js_1.default.updateCurrentUserWishList);
exports.default = userRouter;
//# sourceMappingURL=user.js.map