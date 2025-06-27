import { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Error as MongooseError } from "mongoose";
import { errorResponse } from "../utils/response";
import { ErrorRequestHandler } from "express";

interface CustomError extends Error {
  status?: number;
}

// Bad Request error
class BadRequestError extends Error implements CustomError {
  status = 400;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

// Unauthorized error
class UnauthorizedError extends Error implements CustomError {
  status = 401;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

// Forbidden error
class ForbiddenError extends Error implements CustomError {
  status = 403;
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

// Not found error
class NotFoundError extends Error implements CustomError {
  status = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

// Internal server error
class InternalServerError extends Error implements CustomError {
  status = 500;
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // JWT Errors
  if (error instanceof JsonWebTokenError) {
    return errorResponse(res, 403, "Invalid token.");
  }

  // Mongoose Validation Error
  if (error instanceof MongooseError.ValidationError) {
    const errors = Object.values(error.errors).reduce(
      (acc: Record<string, string>, err) => {
        acc[err.path] = err.message;
        return acc;
      },
      {}
    );
    return errorResponse(res, 400, "Validation Error", errors);
  }

  // Mongoose Cast Error (invalid ID format, etc)
  if (error instanceof MongooseError.CastError) {
    return errorResponse(
      res,
      400,
      `Invalid ${error.path}: ${error.value}`
    );
  }

  // Mongoose Duplicate Key Error
  if (error.name === "MongoServerError" && (error as any).code === 11000) {
    const keyValue = (error as any).keyValue || {};
    const duplicateField = Object.keys(keyValue)[0] || "field";
    return errorResponse(
      res,
      400,
      `${duplicateField} already exists`
    );
  }

  // Joi Validation Errors
  if (error instanceof Joi.ValidationError) {
    const errorDetail = error.details.reduce(
      (acc: Record<string, string>, detail) => {
        acc[detail.path.join(".")] = detail.message;
        return acc;
      },
      {}
    );
    return errorResponse(res, 400, "Validation Error", errorDetail);
  }

  // Custom Errors
  if (error.status) {
    return errorResponse(res, error.status, error.message);
  }

  // Unknown Errors
  console.error("Unhandled Error:", error);
  return errorResponse(res, 500, "An unexpected error occurred");
};

export {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  errorHandler,
};
