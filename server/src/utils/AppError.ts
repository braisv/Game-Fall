import { AppError, StatusError } from "./types";

class BaseError extends Error implements AppError  {
  statusCode: number;
  status: keyof typeof StatusError;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? StatusError.fail : StatusError.error;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
}

export {
  BaseError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
};
