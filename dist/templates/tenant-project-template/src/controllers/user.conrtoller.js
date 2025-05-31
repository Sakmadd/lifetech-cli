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
exports.UserController = void 0;
const response_middleware_1 = require("../middlewares/response.middleware");
const user_validation_1 = require("../validations/user.validation");
class UserController {
    constructor(userService) {
        this.SyncUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const validate = user_validation_1.UserSyncSchema.safeParse(req.body);
            if (!validate.success) {
                return res.error(new response_middleware_1.Exception('BAD_REQUEST', 400, validate.error));
            }
            try {
                const user = yield this.userService.SyncUser(validate.data);
                return res.success(user, 'User synced successfully', 200);
            }
            catch (error) {
                res.error(error);
            }
        });
        this.userService = userService;
    }
}
exports.UserController = UserController;
