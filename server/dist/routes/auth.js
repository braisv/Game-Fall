"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("../controllers/AuthController/index.js"));
const router = express_1.default.Router();
router.post("/signup", index_js_1.default.register);
router.post("/login", index_js_1.default.login);
router.get("/logout", index_js_1.default.logout);
router.get("/currentuser", index_js_1.default.getCurrentUser);
exports.default = router;
//# sourceMappingURL=auth.js.map