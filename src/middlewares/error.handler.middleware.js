import ApiError from "../utils/api.error.js";
import mongoose from 'mongoose';
import httpStatus from 'http-status';
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (!(err instanceof ApiError)) {
        // Handle Mongoose specific errors
        if (err instanceof mongoose.Error.CastError) {
            statusCode = httpStatus.BAD_REQUEST;
            message = `Invalid ${err.path}: ${err.value}.`;
        } else if (err.code === 11000) { // Mongoose duplicate key error
            statusCode = httpStatus.BAD_REQUEST;
            const field = Object.keys(err.keyValue)[0];
            message = `Duplicate field value entered for: ${field}. Please use another value.`;
        } else if (err instanceof mongoose.Error.ValidationError) {
            statusCode = httpStatus.BAD_REQUEST;
            const errors = Object.values(err.errors).map(el => el.message);
            message = `Invalid input data. ${errors.join('. ')}`;
        } else {
            // Default to 500 Internal Server Error for unknown errors
            statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
            message = message || 'Internal Server Error';
        }
        // Create an ApiError instance for consistent response format
        err = new ApiError(statusCode, message, err?.errors || [], err.stack);
    }
    const response = {
        ...err,
        message: err.message
    };
    res.status(err.statusCode).json(response);
}
export default errorHandler;