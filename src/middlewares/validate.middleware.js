import { validationResult } from 'express-validator';
import httpStatus from 'http-status';
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    next();
    return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed. Please check your input.',
        errors: errors.array(),
    });
}