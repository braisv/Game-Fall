import { NextFunction, Response, Request } from "express";
import { catchAsync } from "../../middlewares/errorHandler";
import { StatusCode } from "../../utils/types";
import Game, { IGame } from "../../models/game.model";
import { selectionObject } from "./gameControllerHelper";

  export const getGames = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const games: IGame[] = await Game
        .find()
        .select(selectionObject)

        console.log('GET GAMES RESPONSE:', { games })

      if (!games.length) {
        res.status(StatusCode.noContent).json({ status: "success", data: [] });
      }

      res.status(StatusCode.ok).json({ status: "success", data: games });
  });