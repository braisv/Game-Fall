"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("@/app"));
const process_1 = require("process");
const server = http_1.default.createServer(app_1.default);
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${process.env.PORT} requires elevated privileges`);
            return (0, process_1.exit)(1);
        case 'EADDRINUSE':
            console.error(`Port ${process.env.PORT}is already in use`);
            return (0, process_1.exit)(1);
        default:
            throw error;
    }
});
server.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    console.log({ err });
    console.error(err);
    server.close(() => {
        (0, process_1.exit)(1);
    });
});
//# sourceMappingURL=server.js.map