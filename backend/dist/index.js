import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { connectDB } from './db/index.js';
import logger from './utils/logger.js';
import { getPort } from './utils/port.js';
process.on('uncaughtException', ex => {
    logger.error('UNCAUGHT EXCEPTION! Shutting down...', ex);
    process.exit(1);
});
import { app } from './app.js';
const PORT = getPort(process.env.PORT);
let server;
connectDB()
    .then(() => {
    server = app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
})
    .catch(err => {
    logger.error('Failed to start server\n', err);
    process.exit(1);
});
process.on('unhandledRejection', err => {
    logger.error('UNHANDLED REJECTION! Shutting down...', err);
    if (server) {
        server.close(() => process.exit(1));
    }
    else {
        process.exit(1);
    }
});
//# sourceMappingURL=index.js.map