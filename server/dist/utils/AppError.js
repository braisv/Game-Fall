"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.BaseError = void 0;
const types_1 = require("./types");
class BaseError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? types_1.StatusError.fail : types_1.StatusError.error;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseError = BaseError;
class ValidationError extends BaseError {
    constructor(message) {
        super(message, types_1.StatusCode.badRequest);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends BaseError {
    constructor(message) {
        super(message, types_1.StatusCode.notFound);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends BaseError {
    constructor(message) {
        super(message, types_1.StatusCode.unauthorized);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=AppError.js.map