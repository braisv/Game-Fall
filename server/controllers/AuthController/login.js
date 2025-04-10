const passport = require("passport");
const { UnauthorizedError } = require("../../utils/AppError");

exports.login = async (req, res, next) =>
  passport.authenticate("local", (err, user, failureDetails, status) => {
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
