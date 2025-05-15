export declare enum StatusError {
    fail = "fail",
    error = "error"
}
export declare enum StatusCode {
    ok = 200,
    created = 201,
    accepted = 202,
    nonAuthoritative = 203,
    noContent = 204,
    reset = 205,
    partialContent = 206,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500
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
