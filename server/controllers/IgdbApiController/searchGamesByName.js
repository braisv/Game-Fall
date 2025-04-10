const APIHandler = require("../../helper/APIhandler.js");
const { catchAsync } = require("../../middlewares/errorHandler.js");
const { UnauthorizedError, ValidationError, NotFoundError } = require("../../utils/AppError.js");

const igdbAPI = new APIHandler();

exports.searchGamesByName = catchAsync(async (req, res, next) => {
  if (!req.user) {
    next(new UnauthorizedError("Not authorized to use this service."));
  }

  if (!req.query?.query) {
    next(new ValidationError("Query must be provided."));
  }

  const gameArr = await igdbAPI.searchGamesByName(req.query.query);

  if (!gameArr.data || !gameArr.data.length) {
    return res.status(204).json({ status: "success", data: [] });
  }

  return res.status(200).json({ status: "success", data: gameArr.data });
});
