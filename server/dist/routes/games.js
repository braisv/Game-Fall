"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("../controllers/GameController/index.js"));
const gameRouter = express_1.default.Router();
gameRouter.get("/", index_js_1.default.getGames);
gameRouter.post("/new", index_js_1.default.createGame);
gameRouter.post("/remove/:id", index_js_1.default.deleteGameById);
gameRouter.get("/:id", index_js_1.default.getGameById);
gameRouter.post("/update", index_js_1.default.updateAmount);
gameRouter.post("/edit/:id", index_js_1.default.updateGameById);
exports.default = gameRouter;
//# sourceMappingURL=games.js.map