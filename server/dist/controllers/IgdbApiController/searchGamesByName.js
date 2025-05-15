"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGamesByName = void 0;
const APIhandler_1 = __importDefault(require("../../helper/APIhandler"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const AppError_1 = require("../../utils/AppError");
const variables_1 = require("../../utils/variables");
const igdbAPI = new APIhandler_1.default();
exports.searchGamesByName = (0, errorHandler_1.catchAsync)(async (req, res, next) => {
    if (!req.user) {
        next(new AppError_1.UnauthorizedError("Not authorized to use this service."));
    }
    if (typeof req.query?.query !== 'string') {
        next(new AppError_1.ValidationError("Query must be provided."));
    }
    const gameArr = await igdbAPI.searchGamesByName(req.query.query);
    console.log('Service IGDB search games by name response:', { gameArr });
    if (!gameArr.data || !gameArr.data.length) {
        res.status(204).json({ status: variables_1.StatusRequestSuccess, data: [] });
    }
    else {
        res.status(200).json({ status: variables_1.StatusRequestSuccess, data: gameArr.data });
    }
});
//# sourceMappingURL=searchGamesByName.js.map