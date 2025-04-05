import httpStatus from 'http-status';
import ApiError from '../utils/api.error.js';
import asyncHandler from '../utils/async.handler.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
export const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required: No token provided.');
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById({ _id: decoded.sub }).select('-password');
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User associated with this token no longer exists.');
        }
        if (!user.isActive) {
            throw new ApiError(httpStatus.FORBIDDEN, 'User account is inactive.');
        }
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Token has expired. Please log in again.');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token. Please log in again.');
        }
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication failed.');
    }
});
export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User role not found in request. Ensure authMiddleware runs first.');
        }
        const userRoles = req.user.role;
        const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        // if (!requiredRoles.every((userRoles) => userRoles.includes(userRoles))) {
        //     throw new ApiError(
        //         httpStatus.FORBIDDEN,
        //         `Access denied. Required role(s): ${rolesToCheck.join(', ')}.`
        //     );
        // }
        // if (!userRoles.some((role) => rolesToCheck.includes(role))) {
        //     throw new ApiError(
        //         httpStatus.FORBIDDEN,
        //         `Access denied. Required role(s): ${rolesToCheck.join(', ')}.`
        //     );
        // }
        if (!rolesToCheck.includes(userRoles)) {
            throw new ApiError(
                httpStatus.FORBIDDEN,
                `Access denied. Required role(s): ${rolesToCheck.join(', ')}.`
            );
        }
        next();
    };
}
