import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import logger from './utils/logger.js';

process.on('uncaughtException', ex => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', ex);
  process.exit(1);
});

import { app } from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const PORT = ENV.NODE_ENV;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  } catch (err) {
    logger.error('Failed to connect to database\n', err);
    process.exit(1);
  }
};

startServer();
