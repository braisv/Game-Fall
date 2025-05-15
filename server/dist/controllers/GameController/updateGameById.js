"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameById = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const game_model_1 = __importDefault(require("../../models/game.model"));
const types_1 = require("../../utils/types");
const variables_1 = require("../../utils/variables");
exports.updateGameById = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    if (user?.role === "admin") {
        next(new AppError_1.UnauthorizedError("User has no access to this resource"));
    }
    const game = req.body;
    if (!game?.id) {
        next(new AppError_1.NotFoundError('Game to update not found'));
    }
    const updatedGame = await game_model_1.default.findByIdAndUpdate({ _id: game.id }, { $set: game });
    res.status(types_1.StatusCode.ok).json({
        status: variables_1.StatusRequestSuccess,
        data: updatedGame,
    });
});
// gameRouter.post("/edit/:id", (req, res, next) => {
//   const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;
//   const gameID = req.params.id;
//   Game.findByIdAndUpdate(
//     { _id: gameID },
//     { $set: { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } },
//     { new: true }
//   ).then((theGame) => res.json(theGame));
// });
//# sourceMappingURL=updateGameById.js.map