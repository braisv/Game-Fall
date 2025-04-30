const { catchAsync } = require("../../middlewares/errorHandler");
const Game = require("../../models/Game");
const { NotFoundError, UnauthorizedError } = require("../../utils/AppError");

exports.updateGame = catchAsync(async (req, res, next) => {
  if (!req.user.role === "admin") {
    next(new UnauthorizedError("User has no valid credentials"));
  }

  const game = req.body;

  const updatedGame = await Game.findByIdAndUpdate({ _id: id }, { $set: game });

  if (!updatedGame.data) {
    next(new NotFoundError("Not game found to update"));
  }
});
