import winston from "winston";

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

const errorHandler = (err, req, res, next) => {
  console.log("ERROR HANDLER", { nodeEnv: process.env.NODE_ENV });
  logger.error("LOGGER Error 💥", {
    error: err,
    stack: err.stack,
  });

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
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};

const catchAsync = (fn) => {
  console.log("CATCh");
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      console.log("CATCH ASYNC ERROR", error);
      next(error);
    });
  };
};

const handleMongoError = (error) => {
  console.log("HANDLE MONGO ERROR");
  if (error.name === "CastError") {
    return new BaseError(`Invalid ${error.path}: ${error.value}`, 400);
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return new BaseError(`Duplicate field value: ${field}`, 400);
  }

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);
    return new BaseError(`Invalid input data: ${errors.join(". ")}`, 400);
  }

  return error;
};

export {
  errorHandler,
  catchAsync,
  handleMongoError,
};
