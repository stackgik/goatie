import _ from 'lodash';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/auth.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { sendResetEmail } from '../utils/email.js';
const signup = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        const err = new ApiError('Please fill in all fields (username, email and password)', 422);
        return next(err);
    }
    const userSignupData = _.pick(req.body, [
        'username',
        'email',
        'password',
        'confirmPassword',
        'role',
    ]);
    const newUser = await User.create(userSignupData);
    res.redirect('/api/v1/user/login');
});
const login = asyncHandler(async (req, res, next) => {
    // ? Signing In is simply signing a web token and sending it to the client
    // ? Users will be asked to login using their username and password
    //* 1.check if username and password
    const { username, password } = _.pick(req.body, ['username', 'password']);
    if (!username || !password) {
        // The 422 status code depicts unprocessible request
        const err = new ApiError('Please fill in all fields (username and password)', 422);
        // When there is no username or password, we throw an error that is then handled by the global error middleware
        return next(err);
    }
    //* 2.check user record in the DB
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
        const err = new ApiError('Invalid username or password', 401);
        return next(err);
    }
    //* 3. check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        const err = new ApiError('Invalid username or password', 401);
        return next(err);
    }
    //* 4. send token to the client
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { subject: 'goatApiAccess', expiresIn: '7d' });
    const sanitizedUser = _.pick(user, ['_id', 'username', 'email', 'role']);
    const options = {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
    };
    res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(sanitizedUser, 'User logged in successfully'));
});
const authenticateUser = asyncHandler(async (req, res, next) => {
    //* 1. Check if the token exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        const err = new ApiError('Unauthorized', 401);
        return next(err);
    }
    //* 2. Extract the token
    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
        const err = new ApiError('You are not logged in', 401);
        return next(err);
    }
    // //* 3. Verify the token
    let decoded;
    try {
        decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    }
    catch (error) {
        return next(new ApiError('Invalid token', 401));
    }
    // //* 4. Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
        const err = new ApiError('Authentication failed', 401);
        return next(err);
    }
    //* 5. Check if the password has been changed after the token was issued
    const isPasswordChanged = user.changedPasswordAfter(decoded.iat);
    if (isPasswordChanged) {
        const err = new ApiError('Password has been changed recently. Please log in again', 401);
        return next(err);
    }
    //* 6. Attach the user to the request objects
    req.user = user;
    //* 7. Grant access to the route
    next();
});
const forgotPassword = asyncHandler(async (req, res, next) => {
    // 1. check if the user is signed up on the platform
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const err = new ApiError('User not found', 404);
        return next(err);
    }
    // 2. generate a random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // 3. send the token to the user's mail
    const protocol = req.protocol;
    const host = req.get('host');
    const email = user.email;
    try {
        await sendResetEmail(protocol, host, email, resetToken);
        res
            .status(200)
            .json({ message: 'Password reset email sent successfully' });
    }
    catch (err) {
        // if there is an error sending the mail, reset the forgotPasswordToken and forgotPasswordExpires fields saved in the database
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save({ validateBeforeSave: false });
        // call the global error handler middleware
        return next(new ApiError('Failed to send reset email', 500));
    }
});
const resetPassword = asyncHandler(async (req, res, next) => {
    const token = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        const err = new ApiError('Invalid or expired token', 400);
        return next(err);
    }
    // 3. Hash the new password
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // 4. Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    // 5. Save the updated user to the database
    await user.save();
    // 6. Send a success response
    res.status(200).json(new ApiResponse(null, 'Password reset successful'));
});
export { signup, login, authenticateUser, forgotPassword, resetPassword };
//# sourceMappingURL=auth.controllers.js.map