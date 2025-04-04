import ApiError from "../utils/api.error.js";
import httpStatus from 'http-status';
import User from '../models/User.model.js';
class AdminAuthService {
    constructor(userModel) {
        this.User = userModel;
    }

    async register(userData) {
        if (await this.User.isEmailTaken(userData.email)) {
            throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
        }
        const user = new this.User({ email: userData.email, password: userData.password });
        await user.save();
        return user;
    }
    async login(email, password) {
        const user = await this.User.findOne({ email: email }).select('+password');
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
        }
        const isPasswordMatch = await user.isPasswordMatch(password);
        if (!isPasswordMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
        }
        const tokens = this._generateTokens(user);

        return { user, ...tokens };
    }
    _generateTokens(user) {
        const access_token = user.createAccessToken();
        const refresh_token = user.createRefreshToken();
        return { access_token, refresh_token };
    }

}
export default new AdminAuthService(User);
