import { NextFunction, Response, Request } from 'express';
import { AppError, MongoError } from '../utils/types';
import { BaseError } from '../utils/AppError';
declare const handleMongoError: (error: MongoError) => BaseError | MongoError;
declare const errorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
declare const catchAsync: (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => void;
export { errorHandler, catchAsync, handleMongoError };
