"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const logFile = path_1.default.resolve(__dirname, '../../../logs/app.log');
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)),
    transports: [
        new winston_1.transports.File({ filename: logFile, maxsize: 10485760, maxFiles: 5 }),
        new winston_1.transports.Console({ format: winston_1.format.simple() }),
    ],
});
exports.default = logger;
