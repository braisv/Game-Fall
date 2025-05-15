import {Request, Response, NextFunction} from 'express';
import {catchAsync} from '../../middlewares/errorHandler';
import {IUser} from '../../models/user.model';
import {NotFoundError, UnauthorizedError} from '../../utils/AppError';
import Game, {IGame} from '../../models/game.model';
import {StatusCode} from '../../utils/types';
import {StatusRequestSuccess} from '../../utils/variables';

export const updateAmount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (user?.role === 'admin') {
      next(new UnauthorizedError('User has no access to this resource'));
    }

    const game = req.body as IGame;

    if (!game?.id) {
      next(new NotFoundError('Game to update not found'));
    }

    const {id: _id, amount = 0} = game;

    const updatedGame = await Game.findByIdAndUpdate(
      {_id},
      {$set: {amount}},
      {new: true},
    );

    res.status(StatusCode.ok).json({
      status: StatusRequestSuccess,
      data: updatedGame,
    });
  },
);
