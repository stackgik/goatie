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
    //3. Verify the token
    // This will only return the payload of the token, which can then be used for anything.
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    //*  4. Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
        const err = new ApiError('Uthentication failed', 401);
        return next(err);
    }
    next();
});
export { authenticateUser };
//# sourceMappingURL=protect.controllers.js.map