import express from "express";
import IgdbApiController from "../../controllers/IgdbApiController/index.js";

const igdbApiRouter = express.Router();

igdbApiRouter.get("/game/:id", IgdbApiController.getGameById);
igdbApiRouter.get("/search", IgdbApiController.searchGamesByName);

export default igdbApiRouter;
