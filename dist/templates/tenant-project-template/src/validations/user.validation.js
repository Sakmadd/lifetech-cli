"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSyncSchema = void 0;
const zod_1 = require("zod");
exports.UserSyncSchema = zod_1.z.object({
    enterpriseUserId: zod_1.z.string().min(1, 'Enterprise user ID is required'),
    email: zod_1.z.string().min(1, 'Email is required'),
    name: zod_1.z.string().min(1, 'Name is required'),
});
