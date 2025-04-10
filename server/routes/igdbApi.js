const express = require("express");
const igdbApiRouter = express.Router();
const IgdbApiController = require("../controllers/IgdbApiController");

igdbApiRouter.get("/game/:id", IgdbApiController.getGameById);
igdbApiRouter.get("/search", IgdbApiController.searchGamesByName);

module.exports = igdbApiRouter;
