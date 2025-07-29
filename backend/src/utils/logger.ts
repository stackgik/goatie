import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json, colorize, errors } = format;

const logger = createLogger({
  level: 'info', // Logs only 'info' and higher severity levels
  format: combine(
    timestamp(), // Adds a timestamp to all logs
    errors({ stack: true }), // Serialize error objects
    json() // Formats logs as JSON by default
  ),
  transports: [
    new transports.File({
      filename: './src/logs/combined.log',
    }),
    new transports.File({
      filename: './src/logs/error.log',
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: './src/logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: './src/logs/rejections.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(), // Adds color for console logs
        format.simple() // Simplified format for console readability
      ),
    })
  );
}

export default logger;
