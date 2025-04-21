import { body } from "express-validator";

export const publicProfileUpdateValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
]

export const publicProfileLogoutValidationRules = [
    // Validate the email field
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
]