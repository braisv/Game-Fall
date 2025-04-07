class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = {
  BaseError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
};
