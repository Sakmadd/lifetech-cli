"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data, message = 'Success') => {
    return {
        status: 'success',
        message,
        data,
    };
};
exports.successResponse = successResponse;
const errorResponse = (message = 'Error', statusCode = 400) => {
    return {
        status: 'error',
        message,
        statusCode,
    };
};
exports.errorResponse = errorResponse;
