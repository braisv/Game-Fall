import { AppError, StatusCode, StatusError } from "./types";
declare class BaseError extends Error implements AppError {
    statusCode: StatusCode;
    status: keyof typeof StatusError;
    isOperational: boolean;
    constructor(message: string, statusCode: StatusCode);
}
declare class ValidationError extends BaseError {
    constructor(message: string);
}
declare class NotFoundError extends BaseError {
    constructor(message: string);
}
declare class UnauthorizedError extends BaseError {
    constructor(message: string);
}
export { BaseError, ValidationError, NotFoundError, UnauthorizedError, };
