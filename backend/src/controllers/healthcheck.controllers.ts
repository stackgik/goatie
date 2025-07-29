import { asyncHandler } from '../utils/asyncHandler.js';

export const healthcheck = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Endpoint is working properly. Over!',
  });
});
