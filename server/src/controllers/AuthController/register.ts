import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../middlewares/errorHandler';
import { ValidationError } from '../../utils/AppError';
import { StatusCode } from '../../utils/types';
import { StatusRequestSuccess } from '../../utils/variables';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {username, password, ...userRequested} = req.body;

  if (!username || !password) {
    throw new ValidationError('You must provide valid credentials');
  }

  const isExistinngUsername = await User.findOne({username});

  if (isExistinngUsername) {
    throw new ValidationError('Username already exists');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const userCreated = await User.create({
    ...userRequested,
    username,
    password: hashPass,
  });

  const {password: key, ...user} = userCreated;

  res.status(StatusCode.created).json({
    status: StatusRequestSuccess,
    data: user,
  });
});
