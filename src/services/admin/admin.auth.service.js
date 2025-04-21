import ApiError from "../../utils/api.error.js";
import httpStatus from 'http-status';
import User from '../../models/User.model.js';
class AdminAuthService {
    constructor(userModel) {
        this.User = userModel;
    }

    async register(userData) {
        if (await this.User.isEmailTaken(userData.email)) {
            throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
        }
        const role = userData.role || 'admin';
        const modelData = new this.User({ ...userData, role });
        await modelData.save();
        return modelData;
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
    findUserByVerificationToken = async (token) => {
        return User.findUserByVerificationToken(token);
    }

    generateAndSetVerificationToken = async (user) => {
        // ... (your existing code) ...
        const plainToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(plainToken)
            .digest('hex');
        user.emailVerificationToken = hashedToken;
        user.verificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
        await user.save({ validateBeforeSave: false }); // Save token fields
        return plainToken;
    }

    // --- New Service Methods for Password Reset ---

    findUserByEmail = async (email) => {
        return User.findOne({ email });
    }

    // Generates token, sets it on user, saves user, returns plain token
    generateAndSetPasswordResetToken= async (user) => {
        const plainResetToken = user.createPasswordResetToken(); // Use the instance method
        // The instance method sets the fields, now we just save
        await user.save({ validateBeforeSave: false }); // Skip validation, only token fields changed
        return plainResetToken;
    }

    findUserByResetToken= async (token) => {
        // Uses the static method which hashes the token and checks expiry
        return User.findUserByPasswordResetToken(token);
    }

    resetPasswordWithToken=  async (user, newPassword) => {
        // Set the new password (pre-save hook will hash it)
        user.password = newPassword;
        // Invalidate the token
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;
        // Save the user (triggers pre-save hook for hashing)
        await user.save(); // Let validation run for the password
    }

}
export default new AdminAuthService(User);
