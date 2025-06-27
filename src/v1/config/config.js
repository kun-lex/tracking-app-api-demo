"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cspOptions = exports.HOST = exports.REDIS_URI = exports.SERVER_CALLBACK_URL = exports.NODE_ENV = exports.PORT = exports.DB_CONNECTION = void 0;
const dotenv_1 = require("dotenv");
const validations_1 = require("../validations");
const logging_1 = __importDefault(require("./logging"));
(0, dotenv_1.config)();
const { value: envVars, error } = validations_1.envValidation.validate(process.env);
if (error) {
    logging_1.default.error(error);
}
exports.DB_CONNECTION = envVars.DB_CONNECTION;
exports.PORT = parseInt(envVars.PORT);
exports.NODE_ENV = envVars.NODE_ENV;
exports.SERVER_CALLBACK_URL = process.env.SERVER_CALLBACK_URL;
exports.REDIS_URI = process.env.REDIS_URI;
exports.HOST = process.env.HOST || 'localhost';
exports.cspOptions = {
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
    },
};
