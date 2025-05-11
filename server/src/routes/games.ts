import express from "express";
import GameController from "../controllers/GameController/index.js";

const gameRouter = express.Router();

gameRouter.get("/", GameController.getGames);
gameRouter.post("/new", GameController.createGame);
gameRouter.post("/remove/:id", GameController.deleteGameById);
gameRouter.get("/:id", GameController.getGameById);
gameRouter.post("/update", GameController.updateAmount);
gameRouter.post("/edit/:id", GameController.updateGameById);

export default gameRouter;
