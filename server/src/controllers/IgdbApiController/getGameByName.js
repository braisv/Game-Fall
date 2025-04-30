const APIHandler = require("../../src/helper/APIhandler.js");
const { catchAsync } = require("../../src/middlewares/errorHandler.js");
const { UnauthorizedError, ValidationError, NotFoundError } = require("../../utils/AppError.js");

const igdbAPI = new APIHandler();

exports.getGameById = catchAsync(async (req, res, next) => {
  if (!req.user) {
    next(new UnauthorizedError("Not authorized to use this service."));
  }

  if (!req.params?.id) {
    next(new ValidationError("Id must be provided."));
  }

  const game = await igdbAPI.getGame(req.params.id);

  if (!game?.data[0]) {
    next(new NotFoundError("Not found any resource with that id."));
  }

  return res.status(200).json({ status: "success", data: game.data[0] });
});
