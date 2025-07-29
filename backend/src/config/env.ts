import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const ENV = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
};
