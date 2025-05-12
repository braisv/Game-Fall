import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../middlewares/errorHandler";
import { NotFoundError, ValidationError } from "../../utils/AppError";
import User from "../../models/user.model";
import { StatusCode } from "../../utils/types";
import { StatusRequestSuccess } from "../../utils/variables";

export const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
  
    if (!id) {
        next(new ValidationError('ID must be provided'))
    }

    const user = await User.findById(id)

    if (!user) {
        next(new NotFoundError('User not found by provided id'));
    }

    console.log('GET USER BY ID:' , { user })

    res.status(StatusCode.ok).json({ status: StatusRequestSuccess, data: user });
});