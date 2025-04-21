import { body } from "express-validator";

export const sellerProfileUpdateValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
]

export const sellerProfileLogoutValidationRules = [
    // Validate the email field
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
]