import {AppError, StatusCode, StatusError} from './types';

class BaseError extends Error implements AppError {
  statusCode: StatusCode;
  status: keyof typeof StatusError;
  isOperational: boolean;

  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')
      ? StatusError.fail
      : StatusError.error;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.badRequest);
  }
}

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.notFound);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.unauthorized);
  }
}

export {BaseError, ValidationError, NotFoundError, UnauthorizedError};
