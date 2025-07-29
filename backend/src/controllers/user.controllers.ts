import { Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { IAuthenticationRequest } from './auth.controllers.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/auth.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const updateMyPersonalDetails = asyncHandler(
  async (req: IAuthenticationRequest, res: Response, next: NextFunction) => {
    const { username, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    // 1. Check if the user exists in the database
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      const err = new ApiError('User not found', 404);
      return next(err);
    }

    // 2. Update the user's username if provided
    if (username) {
      user.username = username;
    }

    // 3. Update the user's password if provided
    if (currentPassword && newPassword) {
      const isMatch = await user.comparePassword(currentPassword);

      if (!isMatch) {
        const err = new ApiError('Invalid current password', 401);
        return next(err);
      }

      user.password = newPassword;
      user.confirmPassword = confirmNewPassword;

      await user.save();

      // 4. Send a success response
      res
        .status(200)
        .json(new ApiResponse(null, 'User details updated successfully'));
    }

    // 5. Redirect the user to the login page
    res.redirect('/api/v1/user/login');
  }
);

const deleteMe = asyncHandler(
  async (req: IAuthenticationRequest, res: Response, next: NextFunction) => {
    // This is a soft delete operation
    const user = await User.findByIdAndUpdate(req.user._id, { active: false });

    if (!user) {
      const err = new ApiError('User not found', 404);
      return next(err);
    }

    res.status(204).json(new ApiResponse(null, 'User deleted successfully'));
  }
);

export { updateMyPersonalDetails, deleteMe };
