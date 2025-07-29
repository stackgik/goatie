import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { ENV } from '../config/env.js';

const URI = ENV.MONGODB_URI;

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(URI as string);
    logger.info(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    throw err;
  }
};
