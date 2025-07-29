import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/auth.models.js';
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
export { authenticateUser };
//# sourceMappingURL=authenticateUser.controllers.js.map