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
exports.generateProject = generateProject;
const degit_1 = __importDefault(require("degit"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const TEMPLATE_MAP = {
    'auth gateway': 'lifetech/templates/auth-gateway',
    'tenant project': 'lifetech/templates/tenant-project',
    others: 'lifetech/templates/default',
};
function generateProject(_a) {
    return __awaiter(this, arguments, void 0, function* ({ type, name }) {
        const spinner = (0, ora_1.default)('Cloning project template...').start();
        const repoPath = TEMPLATE_MAP[type] || TEMPLATE_MAP['others'];
        const emitter = (0, degit_1.default)(repoPath, {
            cache: false,
            force: true,
            verbose: false,
        });
        const targetDir = path_1.default.resolve(process.cwd(), name);
        try {
            yield emitter.clone(targetDir);
            spinner.succeed(`Project "${chalk_1.default.green(name)}" created at ${chalk_1.default.cyan(targetDir)}`);
        }
        catch (err) {
            spinner.fail('Failed to fetch template');
            console.error(err);
        }
    });
}
