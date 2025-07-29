import { ApiError } from '../utils/ApiError.js';
const verifyRole = (role) => {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            const err = new ApiError(`You are not allowed to perform this action`, 403);
            return next(err);
        }
        next();
    };
};
export { verifyRole };
//# sourceMappingURL=verifyRole.controllers.js.map