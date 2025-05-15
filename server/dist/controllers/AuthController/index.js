"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrentUser_1 = require("./getCurrentUser");
const login_1 = require("./login");
const logout_1 = require("./logout");
const register_1 = require("./register");
exports.default = {
    register: register_1.register,
    login: login_1.login,
    logout: logout_1.logout,
    getCurrentUser: getCurrentUser_1.getCurrentUser,
};
//# sourceMappingURL=index.js.map