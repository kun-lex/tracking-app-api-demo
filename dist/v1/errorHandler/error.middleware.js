"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.UnauthorizedError = exports.NotFoundError = exports.InternalServerError = exports.ForbiddenError = exports.BadRequestError = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const response_1 = require("../utils/response");
// Bad Request error
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
// Unauthorized error
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.name = "UnauthorizedError";
    }
}
exports.UnauthorizedError = UnauthorizedError;
// Forbidden error
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
        this.name = "ForbiddenError";
    }
}
exports.ForbiddenError = ForbiddenError;
// Not found error
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
// Internal server error
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
        this.name = "InternalServerError";
    }
}
exports.InternalServerError = InternalServerError;
const errorHandler = (error, req, res, next) => {
    // JWT Errors
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        return (0, response_1.errorResponse)(res, 403, "Invalid token.");
    }
    // Mongoose Validation Error
    if (error instanceof mongoose_1.Error.ValidationError) {
        const errors = Object.values(error.errors).reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
        }, {});
        return (0, response_1.errorResponse)(res, 400, "Validation Error", errors);
    }
    // Mongoose Cast Error (invalid ID format, etc)
    if (error instanceof mongoose_1.Error.CastError) {
        return (0, response_1.errorResponse)(res, 400, `Invalid ${error.path}: ${error.value}`);
    }
    // Mongoose Duplicate Key Error
    if (error.name === "MongoServerError" && error.code === 11000) {
        const keyValue = error.keyValue || {};
        const duplicateField = Object.keys(keyValue)[0] || "field";
        return (0, response_1.errorResponse)(res, 400, `${duplicateField} already exists`);
    }
    // Joi Validation Errors
    if (error instanceof joi_1.default.ValidationError) {
        const errorDetail = error.details.reduce((acc, detail) => {
            acc[detail.path.join(".")] = detail.message;
            return acc;
        }, {});
        return (0, response_1.errorResponse)(res, 400, "Validation Error", errorDetail);
    }
    // Custom Errors
    if (error.status) {
        return (0, response_1.errorResponse)(res, error.status, error.message);
    }
    // Unknown Errors
    console.error("Unhandled Error:", error);
    return (0, response_1.errorResponse)(res, 500, "An unexpected error occurred");
};
exports.errorHandler = errorHandler;
