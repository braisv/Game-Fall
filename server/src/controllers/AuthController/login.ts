import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../../models/user.model";
import { UnauthorizedError } from "../../utils/AppError";
import { StatusCode } from "../../utils/types";
import { StatusRequestSuccess } from "../../utils/variables";


export const login = async (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("local", (err: Error, user: IUser, failureDetails: Error) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new UnauthorizedError(failureDetails.message));
    }

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      return res.status(StatusCode.ok).json({ status: StatusRequestSuccess, data: user });
    });
  })(req, res);
