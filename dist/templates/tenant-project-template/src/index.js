"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const environment_1 = require("./config/environment");
const logger_1 = __importDefault(require("./utils/logger"));
app_1.default.listen(environment_1.ENV.HTTP_PORT, () => {
    logger_1.default.info(`Server HTTP running on port ${environment_1.ENV.HTTP_PORT}`);
});
