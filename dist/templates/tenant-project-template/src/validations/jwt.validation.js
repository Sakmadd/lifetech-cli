"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayloadSchema = void 0;
const zod_1 = require("zod");
exports.JwtPayloadSchema = zod_1.z.object({
    userEnterpriseId: zod_1.z.string(),
    sub: zod_1.z.string(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    tenantEnterpriseId: zod_1.z.string(),
    role: zod_1.z.enum(['SUPERADMIN', 'ADMIN', 'STAFF']),
    iss: zod_1.z.string(),
    aud: zod_1.z.array(zod_1.z.string()),
    exp: zod_1.z.number(),
    iat: zod_1.z.number(),
});
