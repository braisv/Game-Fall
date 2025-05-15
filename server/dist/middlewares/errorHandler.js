"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongoError = exports.catchAsync = exports.errorHandler = void 0;
const winston_1 = __importDefault(require("winston"));
const types_1 = require("../utils/types");
const AppError_1 = require("../utils/AppError");
const logger = winston_1.default.createLogger({
    level: 'error',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
        }),
    ],
});
const handleMongoError = (error) => {
    console.log('HANDLE MONGO ERROR');
    if (error.name === 'CastError') {
        return new AppError_1.NotFoundError(`Invalid ${error.path}: ${error.value}`);
    }
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return new AppError_1.BaseError(`Duplicate field value: ${field}`, types_1.StatusCode.badRequest);
    }
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return new AppError_1.BaseError(`Invalid input data: ${errors.join('. ')}`, types_1.StatusCode.badRequest);
    }
    return error;
};
exports.handleMongoError = handleMongoError;
const errorHandler = (err, req, res, next) => {
    console.log('ERROR HANDLER', { nodeEnv: process.env.NODE_ENV });
    logger.error('LOGGER Error 💥', {
        error: err,
        stack: err.stack,
    });
    if (err.name === 'MongoError' || err.name === 'ValidationError') {
        err = handleMongoError(err);
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV !== 'production') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        else {
            console.error('ERROR', err);
            res.status(types_1.StatusCode.serverError).json({
                status: types_1.StatusError.error,
                message: 'Something went wrong!',
            });
        }
    }
};
exports.errorHandler = errorHandler;
const catchAsync = (fn) => {
    console.log('CATCh');
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            console.log('CATCH ASYNC ERROR', error);
            next(error);
        });
    };
};
exports.catchAsync = catchAsync;
//# sourceMappingURL=errorHandler.js.map