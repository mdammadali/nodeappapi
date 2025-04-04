import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from 'validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [false, 'Please provide your name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin', 'seller', 'manager', 'delivery'],
            message: 'Role must be either: user,admin,seller,manager,delivery',
        },
        default: 'user', // Default role for new users
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        country: { type: String, trim: true },
    },
    phone: {
        type: String,
        trim: true
    },
    passwordChangedAt: Date, // Track when password was last changed
    passwordResetToken: { type: String, select: false },
    passwordResetTokenExpires: { type: Date, select: false },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.password;
            delete ret.passwordResetToken;
            delete ret.passwordResetTokenExpires;
            delete ret.emailVerificationToken;
            return ret;
        }
    },
    toObject: { virtuals: true }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    // Optional: Delete passwordConfirm field if you used it (so it doesn't get saved)
    // this.passwordConfirm = undefined;
    if (!this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }
    next();
});
userSchema.methods.isPasswordMatch = async function (candidatePassword) {
    if (!this.password) throw new Error('Password field not selected on user document.');
    return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
}
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
}
userSchema.methods.createAccessToken = function () {
    const user = this;
    const payload = {
        sub: user._id, // 'sub' (subject) is standard claim for user ID
        role: user.role,
    }
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    if (!secretKey) {
        throw new Error('JWT_SECRET environment variable is not set!');
    }
    const options = {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h', // e.g., '15m', '1h', '7d'
        // You can also specify the algorithm, though HS256 is often the default
        // algorithm: 'HS256'
    }
    try {
        const accessToken = jwt.sign(payload, secretKey, options);
        return accessToken;
    } catch (error) {
        console.error("Error creating access token:", error);
        throw new Error('Could not create access token');
    }
}
userSchema.methods.createRefreshToken = function () {
    const user = this;
    const payload = {
        sub: user._id, // 'sub' (subject) is standard claim for user ID
        role: user.role,
    }
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    if (!secretKey) {
        throw new Error('JWT_SECRET environment variable is not set!');
    }
    const options = {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '1d', // e.g., '15m', '1h', '7d'
        // You can also specify the algorithm, though HS256 is often the default
        // algorithm: 'HS256'
    }
    try {
        const refreshToken = jwt.sign(payload, secretKey, options);
        return refreshToken;
    } catch (error) {
        console.error("Error creating refresh token:", error);
        throw new Error('Could not create refresh token');
    }
}
const User = mongoose.model('User', userSchema);
export default User;