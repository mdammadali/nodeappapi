import { body } from "express-validator";

export const adminProfileUpdateValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
]

export const adminProfileLogoutValidationRules = [
    // Validate the email field
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
]