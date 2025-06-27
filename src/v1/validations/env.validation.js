"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const envVarSchema = joi_1.default
    .object({
    // DB_CONNECTION: Joi.string().required(),
    PORT: joi_1.default.number().positive().default(3000),
})
    .unknown();
exports.default = envVarSchema;
