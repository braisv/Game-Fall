"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const game_model_1 = __importDefault(require("../../models/game.model"));
const types_1 = require("../../utils/types");
const variables_1 = require("../../utils/variables");
const gameControllerHelper_1 = require("./gameControllerHelper");
exports.createGame = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;
    if (!name) {
        next(new AppError_1.ValidationError('You must provide a game name'));
    }
    const gameCreated = await game_model_1.default.create({ name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price });
    const selectedGame = await game_model_1.default.findById(gameCreated._id).select(gameControllerHelper_1.selectionObject);
    res.status(types_1.StatusCode.created).json({
        status: variables_1.StatusRequestSuccess,
        data: selectedGame
    });
});
//# sourceMappingURL=createGame.js.map