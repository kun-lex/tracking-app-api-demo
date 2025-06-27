import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: object,
  nextCursor?: string,
  error: boolean = false
): Response => {
  if (statusCode < 200 || statusCode > 299) {
    throw new Error(
      `Invalid status code. Must be between 200 and 299 (inclusive)`
    );
  }

  const formattedMessage = message.endsWith(".") ? message : `${message}.`;

  return res.status(statusCode).json({
    message: formattedMessage,
    data,
    nextCursor,
    error,
  });
};

export const successResponseWithData = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data?: object,
    error: boolean = true
  ): Response => {
    const formattedMessage = message.endsWith(".") ? message : `${message}.`;
    console.log("Error message: ", formattedMessage);
  
    return res.status(statusCode).json({
      statusCode, // <-- Ensure this is included for debugging
      message: formattedMessage,
      data,
      error,
    });
  };
  

// You can import these individually as needed
export default {
  successResponse,
  successResponseWithData,
  errorResponse,
};
