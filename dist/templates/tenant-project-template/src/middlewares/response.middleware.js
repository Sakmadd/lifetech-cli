"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMiddleware = exports.Exception = void 0;
class Exception extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.Exception = Exception;
const responseMiddleware = (req, res, next) => {
    res.success = (data, message = 'Success', statusCode = 200, meta) => {
        res.status(statusCode).json({
            success: true,
            message,
            data,
            meta,
        });
    };
    res.error = (exception) => {
        res.status(exception.statusCode).json({
            success: false,
            message: exception.message,
            details: exception.details,
        });
    };
    next();
};
exports.responseMiddleware = responseMiddleware;
