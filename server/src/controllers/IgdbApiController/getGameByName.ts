import {Request, Response, NextFunction} from 'express';
import APIHandler from '../../helper/APIhandler';
import {catchAsync} from '../../middlewares/errorHandler';
import {
  UnauthorizedError,
  ValidationError,
  NotFoundError,
} from '../../utils/AppError';
import {StatusRequestSuccess} from '../../utils/variables';

const igdbAPI = new APIHandler();

export const getGameById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new UnauthorizedError('Not authorized to use this service.'));
    }

    if (!req.params?.id) {
      next(new ValidationError('Id must be provided.'));
    }

    const game = await igdbAPI.getGame(req.params.id);

    console.log('Service IGDB get game by id response:', {game});

    if (!game?.data[0]) {
      next(new NotFoundError('Not found any resource with that id.'));
    }

    res.status(200).json({status: StatusRequestSuccess, data: game.data[0]});
  },
);
