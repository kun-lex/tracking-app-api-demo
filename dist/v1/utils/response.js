"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponseWithData = exports.successResponse = void 0;
const successResponse = (res, statusCode, message, data, nextCursor, error = false) => {
    if (statusCode < 200 || statusCode > 299) {
        throw new Error(`Invalid status code. Must be between 200 and 299 (inclusive)`);
    }
    const formattedMessage = message.endsWith(".") ? message : `${message}.`;
    return res.status(statusCode).json({
        message: formattedMessage,
        data,
        nextCursor,
        error,
    });
};
exports.successResponse = successResponse;
const successResponseWithData = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.successResponseWithData = successResponseWithData;
const errorResponse = (res, statusCode, message, data, error = true) => {
    const formattedMessage = message.endsWith(".") ? message : `${message}.`;
    console.log("Error message: ", formattedMessage);
    return res.status(statusCode).json({
        statusCode, // <-- Ensure this is included for debugging
        message: formattedMessage,
        data,
        error,
    });
};
exports.errorResponse = errorResponse;
// You can import these individually as needed
exports.default = {
    successResponse: exports.successResponse,
    successResponseWithData: exports.successResponseWithData,
    errorResponse: exports.errorResponse,
};
