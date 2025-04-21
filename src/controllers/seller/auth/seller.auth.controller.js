import sellerAuthService from "../../../services/seller/seller.auth.service.js";
import ApiResponse from "../../../utils/api.response.js";
import asyncHandler from "../../../utils/async.handler.js";
import httpStatus from 'http-status';

class sellerAuthController {

    register = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
        }
        const user = await sellerAuthService.register(req.body);
        res.status(httpStatus.CREATED).json(
            new ApiResponse(httpStatus.CREATED, user, 'User registered successfully')
        );
    });

    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
        }
        const {user, access_token, refresh_token} = await adminAuthService.login(email, password);
        const responseData = {
            user: user.toJSON(),
            access_token,
            refresh_token
        };
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, responseData, 'User LoggedIn Successfully')
        );
    });

    logout(req, res) {
        // Implement logout logic
        res.json({ message: 'Logout successful' });
    }
}
export default new sellerAuthController();