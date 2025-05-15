import {Request, Response, NextFunction} from 'express';
import {catchAsync} from '../../middlewares/errorHandler';
import {NotFoundError, UnauthorizedError} from '../../utils/AppError';
import User, {IUser} from '../../models/user.model';
import {StatusCode} from '../../utils/types';
import {StatusRequestSuccess} from '../../utils/variables';

export const getCurrentUserCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.user as IUser;

    if (!currentUser) {
      next(new UnauthorizedError('User is not logged in'));
    }

    const currentUserWithCart = await User.findById(currentUser._id).populate(
      'cart',
    );

    console.log('GET USER CART:', {currentUserWithCart});

    if (!currentUserWithCart) {
      next(new NotFoundError('User not found'));
    }

    const {cart} = currentUserWithCart || {};

    if (!cart || !cart.length) {
      res
        .status(StatusCode.noContent)
        .json({status: StatusRequestSuccess, data: []});
    }

    res.status(StatusCode.ok).json({status: StatusRequestSuccess, data: cart});
  },
);
