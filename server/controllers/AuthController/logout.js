const { catchAsync } = require("../../middlewares/errorHandler");

exports.logout = catchAsync(async (req, res) => {
  await req.logout();
  res.status(204).json({ status: "success", message: "User logged out successfully" });
});
