export enum StatusError {
    fail = 'fail',
    error = 'error'
}

export interface AppError extends Error {
    statusCode: number;
    status: keyof typeof StatusError;
    isOperational: boolean;
}

export interface MongoError extends AppError {
    path: string;
    value: string;
    code: number;
    keyValue: Error;
    errors: Error[];
}