"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
// Health check route
router.get('/', (_, res) => {
    res.json({ message: 'Welcome to SWMS API' });
});
router.use('/users', user_route_1.default);
exports.default = router;
