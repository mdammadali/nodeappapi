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
        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.verificationTokenExpiry = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, null, 'Email successfully verified!')
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
        }
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, responseData, 'User LoggedIn Successfully')
        );
    });

    forgotPassword = asyncHandler(async (req, res) => {
        const { email } = req.body;
        if (!email) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
        }
        const user = await publicAuthService.findUserByEmail(email);
        if (user) {
            // 2. Generate token, save it to user doc, get plain token back
            const plainResetToken = await publicAuthService.generateAndSetPasswordResetToken(user);

            // 3. Create Reset URL (adjust the base URL for your FRONTEND app)
            // Example: http://localhost:3001/reset-password?token=xxxxx
            const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${plainResetToken}`; // Or point to frontend URL
             // OR for a frontend route:
             // const resetURL = `http://yourfrontend.com/reset-password?token=${plainResetToken}`;


            // 4. Send email
            const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}\nIf you didn't forget your password, please ignore this email! This link is valid for 10 minutes.`; // Customize message

            try {
                await sendEmail({
                    to: user.email,
                    subject: 'Your Password Reset Token (valid for 10 min)',
                    text: message,
                    // html: '<h1>Your HTML version here</h1>' // Optional HTML version
                });

            } catch (err) {
                console.error("ERROR sending password reset email:", err);
                // Critical error: Clear token fields so user can try again later
                user.passwordResetToken = undefined;
                user.passwordResetTokenExpiry = undefined;
                await user.save({ validateBeforeSave: false });

                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to send reset email. Please try again later.');
            }
        }

        // Send generic success response
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, null, 'If your email is registered, you will receive a password reset link.')
        );
    })
    resetPassword = asyncHandler(async (req, res) => {
        const { token } = req.params;
        const { password, passwordConfirm } = req.body;
        if (!password || !passwordConfirm) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Password and confirmation are required');
        }
        if (password !== passwordConfirm) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Passwords do not match');
        }
        const user = await publicAuthService.findUserByResetToken(token);
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Token is invalid or has expired');
        }
        await publicAuthService.resetPasswordWithToken(user, password);
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, null, 'Password successfully reset!')
        );
    });
}
export default new PublicAuthController();