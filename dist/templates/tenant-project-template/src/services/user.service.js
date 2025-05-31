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
exports.UserService = void 0;
const response_middleware_1 = require("../middlewares/response.middleware");
class UserService {
    constructor(prisma) {
        this.SyncUser = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.prisma.users.upsert({
                    where: {
                        enterpriseUserId: data.enterpriseUserId,
                    },
                    update: {
                        name: data.name,
                        email: data.email,
                    },
                    create: {
                        name: data.name,
                        email: data.email,
                        enterpriseUserId: data.enterpriseUserId,
                    },
                });
            }
            catch (error) {
                if (error instanceof response_middleware_1.Exception) {
                    throw error;
                }
                throw new response_middleware_1.Exception('INTERNAL_SERVER_ERROR', 500, error);
            }
        });
        this.prisma = prisma;
    }
}
exports.UserService = UserService;
