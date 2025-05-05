import { NextFunction, Response, Request } from "express";
import { catchAsync } from "../../middlewares/errorHandler";
import { NotFoundError } from "../../utils/AppError";
¡

export const getCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const { password, ...user } = req.user;
    res.status(200).json({ status: "success", data: user });
  } else {
    next(new NotFoundError("No user logged in"));
  }
});
