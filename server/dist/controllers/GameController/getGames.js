"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGames = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const types_1 = require("../../utils/types");
const game_model_1 = __importDefault(require("../../models/game.model"));
const gameControllerHelper_1 = require("./gameControllerHelper");
exports.getGames = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const games = await game_model_1.default
        .find()
        .select(gameControllerHelper_1.selectionObject);
    console.log('GET GAMES RESPONSE:', { games });
    if (!games.length) {
        res.status(types_1.StatusCode.noContent).json({ status: "success", data: [] });
    }
    res.status(types_1.StatusCode.ok).json({ status: "success", data: games });
});
//# sourceMappingURL=getGames.js.map