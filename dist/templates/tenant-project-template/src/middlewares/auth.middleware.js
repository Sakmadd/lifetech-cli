"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_service_1 = require("../services/jwt.service");
const response_middleware_1 = require("./response.middleware");
const logger_1 = __importDefault(require("../utils/logger"));
const environment_1 = require("../config/environment");
const authMiddleware = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info('Auth middleware called', {
            path: req.path,
            method: req.method,
            roles: roles,
        });
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 401, 'No token provided'));
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 401, 'No token provided'));
            }
            const decoded = yield jwt_service_1.JwtService.getInstance().verifyToken(token);
            if (!decoded) {
                return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 401, 'Invalid token'));
            }
            if (decoded.iss !== environment_1.ENV.JWT_ISSUER) {
                return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 401, 'Invalid token issuer'));
            }
            if (decoded.role === 'SUPERADMIN') {
                req.user = decoded;
                return next();
            }
            if (!decoded.aud.includes(environment_1.ENV.JWT_AUDIENCE)) {
                return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 401, 'Invalid token audience'));
            }
            if (roles && roles.length > 0) {
                if (!decoded.role || !roles.includes(decoded.role)) {
                    return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 403, 'You do not have permission to access this resource'));
                }
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            logger_1.default.error('Auth middleware error', {
                error: error.message,
                stack: error.stack,
            });
            if (error.name === 'TokenExpiredError') {
                return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 401, 'Token expired'));
            }
            return res.error(new response_middleware_1.Exception('UNAUTHORIZED', 401, 'Invalid token'));
        }
    });
};
exports.authMiddleware = authMiddleware;
