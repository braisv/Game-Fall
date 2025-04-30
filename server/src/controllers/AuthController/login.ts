import passport from "passport";
import { UnauthorizedError } from "../../utils/AppError";

export const login = async (req, res, next) =>
  passport.authenticate("local", (err, user, failureDetails) => {
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

      return res.status(200).json({ status: "success", data: user });
    });
  })(req, res);
