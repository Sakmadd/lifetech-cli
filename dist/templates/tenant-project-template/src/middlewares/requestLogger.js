"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const requestLogger = (req, res, next) => {
    logger_1.default.info(`${req.method} ${req.originalUrl} - IP: ${req.ip} - Body: ${JSON.stringify(req.body)}`);
    next();
};
exports.default = requestLogger;
