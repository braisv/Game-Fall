import {Request, Response, NextFunction} from 'express';
import {catchAsync} from '../../middlewares/errorHandler';
import {IUser} from '../../models/user.model';
import {NotFoundError, UnauthorizedError} from '../../utils/AppError';
import Game, {IGame} from '../../models/game.model';
import {StatusCode} from '../../utils/types';
import {StatusRequestSuccess} from '../../utils/variables';

export const updateGameById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (user?.role === 'admin') {
      next(new UnauthorizedError('User has no access to this resource'));
    }

    const game = req.body as IGame;

    if (!game?.id) {
      next(new NotFoundError('Game to update not found'));
    }

    const updatedGame = await Game.findByIdAndUpdate(
      {_id: game.id},
      {$set: game},
    );

    res.status(StatusCode.ok).json({
      status: StatusRequestSuccess,
      data: updatedGame,
    });
  },
);

// gameRouter.post("/edit/:id", (req, res, next) => {
//   const { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = req.body;
//   const gameID = req.params.id;
//   Game.findByIdAndUpdate(
//     { _id: gameID },
//     { $set: { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } },
//     { new: true }
//   ).then((theGame) => res.json(theGame));
// });
