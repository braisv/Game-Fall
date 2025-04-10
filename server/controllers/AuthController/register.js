const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { catchAsync } = require("../../middlewares/errorHandler");
const { ValidationError } = require("../../utils/AppError");

exports.register = catchAsync(async (req, res, next) => {
  const { username, password, ...userRequested } = req.body;

  if (!username || !password) {
    throw new ValidationError("You must provide valid credentials");
  }

  const isExistinngUsername = await User.findOne({ username });

  if (isExistinngUsername) {
    throw new ValidationError("User already exists");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const userCreated = await User.create({
    ...userRequested,
    username,
    password: hashPass,
  });

  const { password: key, ...user } = userCreated;

  res.status(201).json({
    status: "success",
    data: user,
  });
});
