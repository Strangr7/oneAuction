import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  logger.error({
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
  });

  if (err instanceof mongoose.Error.ValidationError) {
    error = new apiError(400, "Validation failed", err.errors);
  } else if (err instanceof mongoose.Error.CastError) {
    error = new apiError(400, `Invalid value for ${err.path}`);
  } else if (err.code === 11000) {
    error = new apiError(409, "Duplicate key error");
  } else if (!(error instanceof APIError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new apiError(statusCode, message, [], err.stack);
  }

  const response = {
    statusCode: error.statusCode,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
