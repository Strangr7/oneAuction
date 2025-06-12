import {apiError} from "../utils/apiError.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error(error.stack); // Log full stack trace
    next(new apiError(500, error.message || "Internal server error"));
  });
};

export { asyncHandler };