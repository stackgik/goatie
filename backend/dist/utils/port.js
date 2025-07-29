import logger from './logger.js';
const DEFAULT_PORT = 3000;
const getPort = (envPort) => {
    const port = Number(envPort);
    // Check if the port is a valid number and greater than 0
    if (!isNaN(port) && port > 0) {
        return port;
    }
    logger.warn(`Invalid or missing PORT environment variable. Falling back to default: ${DEFAULT_PORT}`);
    return DEFAULT_PORT;
};
export { getPort };
//# sourceMappingURL=port.js.map