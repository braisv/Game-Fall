import { NextFunction, Response, Request } from "express";
import { catchAsync } from "../../middlewares/errorHandler";
import { StatusCode } from "../../utils/types";
import Game, { IGame } from "../../models/game.model";
import { selectionObject } from "./gameControllerHelper";
import { NotFoundError, ValidationError } from "../../utils/AppError";
import { StatusRequestSuccess } from "../../utils/variables";


export const getGameById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    if (!id) {
        next(new ValidationError('ID must be provided'))
    }

    const game: IGame = await Game
        .findById(id)
        .select(selectionObject)

      console.log('GET GAME RESPONSE:', { game })

    if (!game) {
      next(new NotFoundError('Game not found by provided id'));
    }

    res.status(StatusCode.ok).json({ status: StatusRequestSuccess, data: game });
});