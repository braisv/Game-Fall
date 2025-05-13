import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../middlewares/errorHandler";
import { UnauthorizedError, ValidationError } from "../../utils/AppError";
import User, { IUser } from "../../models/user.model";
import { StatusCode } from "../../utils/types";
import { StatusRequestSuccess } from "../../utils/variables";

export const updateCurrentUserWishList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.user as IUser

    if (!currentUser) {
        next(new UnauthorizedError('User is not logged in'))
    }
    
    const { updatedUserObj } = req.body;

    if (!updatedUserObj) {
        next(new ValidationError('No data provided'))
    }
    
    const userToUpdate = await User.findByIdAndUpdate(
    currentUser._id,
    {$push: {wishlist: updatedUserObj}},
    {new: true},
  )

  res.status(StatusCode.ok).json({ status: StatusRequestSuccess, data: userToUpdate });
});