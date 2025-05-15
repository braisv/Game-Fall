"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameById = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const types_1 = require("../../utils/types");
const game_model_1 = __importDefault(require("../../models/game.model"));
const gameControllerHelper_1 = require("./gameControllerHelper");
const AppError_1 = require("../../utils/AppError");
const variables_1 = require("../../utils/variables");
exports.getGameById = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        next(new AppError_1.ValidationError('ID must be provided'));
    }
    const game = await game_model_1.default
        .findById(id)
        .select(gameControllerHelper_1.selectionObject);
    console.log('GET GAME RESPONSE:', { game });
    if (!game) {
        next(new AppError_1.NotFoundError('Game not found by provided id'));
    }
    res.status(types_1.StatusCode.ok).json({ status: variables_1.StatusRequestSuccess, data: game });
});
//# sourceMappingURL=getGameById.js.map