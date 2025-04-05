import { body } from "express-validator";

export const adminProductCreateValidationRules = [
    body('title')
        .isLength({ min: 2 })
        .withMessage('Title must be at least 2 characters long'),
    body('description')
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long'),
    body('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .isLength({ min: 1 })
        .withMessage('Price must be at least 1 character long'),
]

export const adminProductUpdateValidationRules = [
    // Validate the email field
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    // Validate the password field
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
]