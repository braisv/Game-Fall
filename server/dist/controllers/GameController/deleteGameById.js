"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameById = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const types_1 = require("../../utils/types");
const game_model_1 = __importDefault(require("../../models/game.model"));
const AppError_1 = require("../../utils/AppError");
const variables_1 = require("../../utils/variables");
exports.deleteGameById = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        next(new AppError_1.ValidationError('ID must be provided'));
    }
    const deletedGame = await game_model_1.default.findByIdAndDelete({ _id: id });
    console.log('REMOVE GAME RESPONSE:', { deletedGame });
    res.status(types_1.StatusCode.ok).json({ status: variables_1.StatusRequestSuccess, data: deletedGame });
});
//# sourceMappingURL=deleteGameById.js.map