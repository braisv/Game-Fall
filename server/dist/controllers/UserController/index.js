"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateCurrentUserWishList_1 = require("@/controllers/UserController/updateCurrentUserWishList");
const getCurrentUserCart_1 = require("@/controllers/UserController/getCurrentUserCart");
const getCurrentUserWishList_1 = require("@/controllers/UserController/getCurrentUserWishList");
const getUserById_1 = require("@/controllers/UserController/getUserById");
const removeItemFromCurrentUserCart_1 = require("@/controllers/UserController/removeItemFromCurrentUserCart");
const removeItemFromCurrentUserWishList_1 = require("@/controllers/UserController/removeItemFromCurrentUserWishList");
const updateCurrentUserCart_1 = require("@/controllers/UserController/updateCurrentUserCart");
exports.default = {
    getCurrentUserCart: getCurrentUserCart_1.getCurrentUserCart,
    getCurrentUserWishList: getCurrentUserWishList_1.getCurrentUserWishList,
    getUserById: getUserById_1.getUserById,
    removeItemFromCurrentUserCart: removeItemFromCurrentUserCart_1.removeItemFromCurrentUserCart,
    removeItemFromCurrentUserWishList: removeItemFromCurrentUserWishList_1.removeItemFromCurrentUserWishList,
    updateCurrentUserCart: updateCurrentUserCart_1.updateCurrentUserCart,
    updateCurrentUserWishList: updateCurrentUserWishList_1.updateCurrentUserWishList,
};
//# sourceMappingURL=index.js.map