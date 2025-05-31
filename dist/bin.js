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
const chalk_1 = __importDefault(require("chalk"));
const generator_1 = require("./generator");
const prompt_1 = require("./prompt");
const args = process.argv.slice(2);
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (args.includes('--init')) {
        console.log(chalk_1.default.cyan('\n🚀 Lifetech Project Initializer\n'));
        const answers = yield (0, prompt_1.promptInit)();
        yield (0, generator_1.generateProject)(answers);
    }
    else {
        console.log(chalk_1.default.yellow('Use --init to start a new project.'));
    }
}))();
