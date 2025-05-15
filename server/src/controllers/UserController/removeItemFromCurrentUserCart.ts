import {Request, Response, NextFunction} from 'express';
import {catchAsync} from '../../middlewares/errorHandler';
import {UnauthorizedError, ValidationError} from '../../utils/AppError';
import User, {IUser} from '../../models/user.model';
import {StatusCode} from '../../utils/types';
import {StatusRequestSuccess} from '../../utils/variables';

export const removeItemFromCurrentUserCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.user as IUser;

    if (!currentUser) {
      next(new UnauthorizedError('User is not logged in'));
    }

    const {idToRemove} = req.body;

    if (!idToRemove) {
      next(new ValidationError('No id provided'));
    }

    const userToUpdate = await User.findByIdAndUpdate(
      currentUser._id,
      {$pull: {cart: idToRemove}},
      {multi: true},
    );

    res
      .status(StatusCode.ok)
      .json({status: StatusRequestSuccess, data: userToUpdate});
  },
);
