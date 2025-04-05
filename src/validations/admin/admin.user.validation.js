import { body } from "express-validator";

export const adminUserCreateValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').notEmpty().withMessage('Role is required')
        .isIn(['user', 'admin', 'seller', 'manager', 'delivery']).withMessage('Role must be either: user,admin,seller,manager,delivery'),
    // body('address.street').optional().notEmpty().withMessage('Street is required'),
    // body('address.city').optional().notEmpty().withMessage('City is required'),
    // body('address.postalCode').optional().notEmpty().withMessage('Postal code is required'),
    // body('address.country').optional().notEmpty().withMessage('Country is required'),
    // body('phone').optional().notEmpty().withMessage('Phone number is required'),
    // body('dob').optional().notEmpty().withMessage('Date of birth is required'),
    // body('gender').optional().notEmpty().withMessage('Gender is required'),
    // body('status').optional().notEmpty().withMessage('Status is required')
    //     .isIn(['active', 'inactive']).withMessage('Status must be either: active,inactive'),
    // body('isEmailVerified').optional().notEmpty().withMessage('Email verification status is required'),
    // body('emailVerificationToken').optional().notEmpty().withMessage('Email verification token is required'),
    // body('passwordResetToken').optional().notEmpty().withMessage('Password reset token is required'),
    // body('passwordResetTokenExpires').optional().notEmpty().withMessage('Password reset token expiration date is required'),
    // body('passwordChangedAt').optional().notEmpty().withMessage('Password changed date is required'),
    // body('profilePicture').optional().notEmpty().withMessage('Profile picture is required'),
    // body('coverPicture').optional().notEmpty().withMessage('Cover picture is required'),
    // body('bio').optional().notEmpty().withMessage('Bio is required'),
    // body('website').optional().notEmpty().withMessage('Website is required'),
    // body('facebook').optional().notEmpty().withMessage('Facebook profile URL is required'),
    // body('instagram').optional().notEmpty().withMessage('Instagram profile URL is required'),
    // body('twitter').optional().notEmpty().withMessage('Twitter profile URL is required'),
    // body('linkedin').optional().notEmpty().withMessage('LinkedIn profile URL is required'),
    // body('youtube').optional().notEmpty().withMessage('YouTube profile URL is required'),
]

export const adminUserUpdateValidationRules = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('email').optional().isEmail().withMessage('Email is required'),
    body('password').optional().notEmpty().withMessage('Password is required'),
    body('role').optional().notEmpty().withMessage('Role is required')
        .isIn(['user', 'admin', 'seller', 'manager', 'delivery']).withMessage('Role must be either: user,admin,seller,manager,delivery'),
        
]