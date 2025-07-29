import morgan from 'morgan';
import logger from '../utils/logger.js';
//! MORGAN & LOGGER
const morganFormat = ':method :url :status :response-time ms';
morgan(morganFormat, {
    stream: {
        write: message => {
            const [method, url, status, responseTime] = message?.split(' ');
            const logObject = {
                method,
                url,
                status,
                responseTime,
            };
            logger.info(JSON.stringify(logObject));
        },
    },
});
//# sourceMappingURL=logger.middleware.js.map