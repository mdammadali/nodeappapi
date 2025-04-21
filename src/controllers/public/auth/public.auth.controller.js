import publicAuthService from "../../../services/public/public.auth.service.js";
import ApiResponse from "../../../utils/api.response.js";
import asyncHandler from "../../../utils/async.handler.js";
import httpStatus from 'http-status';
class PublicAuthController {
    register = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
        }
        const user = await publicAuthService.register(req.body);

        res.status(httpStatus.CREATED).json(
            new ApiResponse(httpStatus.CREATED, user, 'User registered successfully')
        );
    });

    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
        }
        const { user, access_token, refresh_token } = await publicAuthService.login(email, password);

        const responseData = {
            user: user.toJSON(),
            access_token,
            refresh_token
        };
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, responseData, 'User LoggedIn Successfully')
        );
    });
    verifyEmail = asyncHandler(async (req, res) => {
        const { token } = req.query;
        if (!token) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Token is required');
        }
        const user = await publicAuthService.findUserByVerificationToken(token);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found or token is invalid');
        }
        if (user.verificationTokenExpiry && new Date() > user.verificationTokenExpiry) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Verification token has expired');
        }
        user.isVerified = true;
        user.emailVerificationToken = null;
        await user.save();
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, null, 'Email successfully verified!')
        );
    });
    forgetPassword = asyncHandler(async (req, res) => {
        const { email } = req.body;
        if (!email) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
        }
    })
}
export default new PublicAuthController();