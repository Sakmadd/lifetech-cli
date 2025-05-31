"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopment = exports.isProduction = exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    NODE_ENV: process.env.NODE_ENV,
    HTTP_PORT: Number(process.env.HTTP_PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_ISSUER: process.env.JWT_ISSUER,
    JWT_AUDIENCE: process.env.JWT_AUDIENCE,
    JWT_PUBLIC_KEY_URL: process.env.JWT_PUBLIC_KEY_URL,
};
exports.isProduction = exports.ENV.NODE_ENV === 'production';
exports.isDevelopment = exports.ENV.NODE_ENV === 'development';
