import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

interface IUser {
  username: string;
  email: string;
  role?: string;
  password: string;
  confirmPassword: string;
  passwordChangedAt?: number;
}

interface ISpecialRequest extends Request {
  user?: IUser;
}

const verifyRole = (role: string) => {
  return (req: ISpecialRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      const err = new ApiError(
        `You are not allowed to perform this action`,
        403
      );
      return next(err);
    }
    next();
  };
};

export { verifyRole };
