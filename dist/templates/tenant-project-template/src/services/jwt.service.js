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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jose_1 = require("jose");
const environment_1 = require("../config/environment");
class JwtService {
    constructor() {
        const jwksUri = new URL(environment_1.ENV.JWT_PUBLIC_KEY_URL);
        this.jwks = (0, jose_1.createRemoteJWKSet)(jwksUri);
    }
    static getInstance() {
        if (!JwtService.instance) {
            JwtService.instance = new JwtService();
        }
        return JwtService.instance;
    }
    /**
     * Verify access token using remote JWKS
     * @param token - JWT token
     */
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { payload } = yield (0, jose_1.jwtVerify)(token, this.jwks, {
                issuer: environment_1.ENV.JWT_ISSUER,
            });
            return payload;
        });
    }
    /**
     * Verify refresh token using remote JWKS
     * @param token - Refresh token
     */
    verifyRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { payload } = yield (0, jose_1.jwtVerify)(token, this.jwks, {
                    issuer: environment_1.ENV.JWT_ISSUER,
                });
                return payload;
            }
            catch (_a) {
                return null;
            }
        });
    }
}
exports.JwtService = JwtService;
