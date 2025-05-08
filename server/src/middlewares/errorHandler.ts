import { NextFunction, Response, Request } from "express";
import winston from "winston";
import { AppError, MongoError, StatusCode, StatusError } from "../utils/types";
import { BaseError, NotFoundError } from "../utils/AppError";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const handleMongoError = (error: MongoError) => {
  console.log("HANDLE MONGO ERROR");
  if (error.name === "CastError") {
    return new NotFoundError(`Invalid ${error.path}: ${error.value}`);
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return new BaseError(`Duplicate field value: ${field}`, StatusCode.badRequest);
  }

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map(err => err.message);
    return new BaseError(`Invalid input data: ${errors.join(". ")}`, StatusCode.badRequest);
  }

  return error;
};

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log("ERROR HANDLER", { nodeEnv: process.env.NODE_ENV });
  logger.error("LOGGER Error 💥", {
    error: err,
    stack: err.stack,
  });

  if (err.name === "MongoError" || err.name === "ValidationError") {
    err = handleMongoError(err as MongoError);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV !== "production") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error("ERROR", err);
      res.status(StatusCode.serverError).json({
        status: StatusError.error,
        message: "Something went wrong!",
      });
    }
  }
};

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  console.log("CATCh");
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error: AppError) => {
      console.log("CATCH ASYNC ERROR", error);
      next(error);
    });
  };
};


export {
  errorHandler,
  catchAsync,
  handleMongoError,
};
