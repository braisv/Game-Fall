import { NextFunction, Response, Request } from "express";
import { catchAsync } from "../../middlewares/errorHandler";
import { NotFoundError } from "../../utils/AppError";
import { StatusCode } from "../../utils/types";
import { IUser } from "../../models/user.model";

export const getCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const { password, ...user } = req.user as IUser;
    res.status(StatusCode.ok).json({ status: "success", data: user });
  } else {
    next(new NotFoundError("No user logged in"));
  }
});
