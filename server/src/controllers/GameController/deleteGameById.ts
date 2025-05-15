import {NextFunction, Response, Request} from 'express';
import {catchAsync} from '../../middlewares/errorHandler';
import {StatusCode} from '../../utils/types';
import Game, {IGame} from '../../models/game.model';
import {ValidationError} from '../../utils/AppError';
import {StatusRequestSuccess} from '../../utils/variables';

export const deleteGameById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    if (!id) {
      next(new ValidationError('ID must be provided'));
    }

    const deletedGame: IGame | null = await Game.findByIdAndDelete({_id: id});

    console.log('REMOVE GAME RESPONSE:', {deletedGame});

    res
      .status(StatusCode.ok)
      .json({status: StatusRequestSuccess, data: deletedGame});
  },
);
