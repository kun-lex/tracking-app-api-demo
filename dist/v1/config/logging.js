"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
const chalk_1 = __importDefault(require("chalk"));
//custom error and info logging to the console.
//Classes of color for different console message
class Logging {
}
_a = Logging;
Logging.log = (arg) => _a.info(arg);
Logging.info = (arg) => console.log(chalk_1.default.blue(`[${new Date().toISOString()}] [info]`), typeof arg === 'string' ? chalk_1.default.blueBright(arg) : arg);
Logging.warn = (arg) => console.log(chalk_1.default.yellow(`[${new Date().toLocaleString()}] [info]`), typeof arg === 'string' ? chalk_1.default.yellowBright(arg) : arg);
Logging.error = (arg) => console.log(chalk_1.default.red(`[${new Date().toLocaleString()}] [info]`), typeof arg === 'string' ? chalk_1.default.redBright(arg) : arg);
exports.default = Logging;
