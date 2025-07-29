import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import mongoose from 'mongoose';
import logger from '../utils/logger.js';
const URI = process.env.MONGODB_URI;
export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(URI);
        logger.info(`MongoDB Connected: ${connectionInstance.connection.host}`);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=index.js.map