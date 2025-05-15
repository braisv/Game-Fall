import {Request, Response, NextFunction} from 'express';
import APIHandler from '../../helper/APIhandler';
import {catchAsync} from '../../middlewares/errorHandler';
import {UnauthorizedError, ValidationError} from '../../utils/AppError';
import {StatusRequestSuccess} from '../../utils/variables';

const igdbAPI = new APIHandler();

export const searchGamesByName = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new UnauthorizedError('Not authorized to use this service.'));
    }

    if (typeof req.query?.query !== 'string') {
      next(new ValidationError('Query must be provided.'));
    }

    const gameArr = await igdbAPI.searchGamesByName(req.query.query as string);

    console.log('Service IGDB search games by name response:', {gameArr});

    if (!gameArr.data || !gameArr.data.length) {
      res.status(204).json({status: StatusRequestSuccess, data: []});
    } else {
      res.status(200).json({status: StatusRequestSuccess, data: gameArr.data});
    }
  },
);
