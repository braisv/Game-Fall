import { NextFunction, Response, Request } from "express";
import { catchAsync } from "../../middlewares/errorHandler";
import { ValidationError } from "../../utils/AppError";
import Game from "../../models/game.model";
import { StatusCode } from "../../utils/types";
import { StatusRequestSuccess } from "../../utils/variables";
import { selectionObject } from "./gameControllerHelper";

export const createGame = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;

  if (!name) {
    next(new ValidationError('You must provide a game name'));
  }

  const gameCreated = await Game.create({ name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price })
  
  const selectedGame = await Game.findById(gameCreated._id).select(selectionObject)
  res.status(StatusCode.created).json({
    status: StatusRequestSuccess,
    data: selectedGame
  });
});