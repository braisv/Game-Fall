export type AppError = Error & {
    statusCode: number;
    status: "fail" | "error" | "success";
    isOperational: boolean;
}