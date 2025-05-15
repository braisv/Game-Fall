"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IgdbApiController_1 = __importDefault(require("../controllers/IgdbApiController"));
const igdbApiRouter = express_1.default.Router();
igdbApiRouter.get("/game/:id", IgdbApiController_1.default.getGameById);
igdbApiRouter.get("/search", IgdbApiController_1.default.searchGamesByName);
exports.default = igdbApiRouter;
//# sourceMappingURL=igdbApi.js.map