import { body } from "express-validator";

export const registerValidationRules = [
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

    // Validate the name field
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
]

export const loginValidationRules = [
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