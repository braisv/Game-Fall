"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameById = void 0;
const APIhandler_1 = __importDefault(require("../../helper/APIhandler"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const variables_1 = require("../../utils/variables");
const igdbAPI = new APIhandler_1.default();
exports.getGameById = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    if (!req.user) {
        next(new AppError_1.UnauthorizedError("Not authorized to use this service."));
    }
    if (!req.params?.id) {
        next(new AppError_1.ValidationError("Id must be provided."));
    }
    const game = await igdbAPI.getGame(req.params.id);
    console.log('Service IGDB get game by id response:', { game });
    if (!game?.data[0]) {
        next(new AppError_1.NotFoundError("Not found any resource with that id."));
    }
    res.status(200).json({ status: variables_1.StatusRequestSuccess, data: game.data[0] });
});
//# sourceMappingURL=getGameByName.js.map