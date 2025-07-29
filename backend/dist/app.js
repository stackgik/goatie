import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import sanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cors from 'cors';
import { ApiError } from './utils/ApiError.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
const app = express();
app.use(express.json());
// Alternatively, configure CORS for specific origins
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow only these methods
    credentials: true, // Allow cookies and credentials
}));
// Data sanitization against NoSQL query injection should come after the body parser
app.use(sanitize());
// Data sanitization against XSS should come after the body parser
app.use(xss());
// Set security headers
app.use(helmet());
let limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
// Apply the rate limiting middleware
app.use('/api/v1', limiter);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
// ROUTES IMPORT
import healthcheckRoutes from './routes/healthcheck.routes.js';
import goatRoutes from './routes/goat.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import salesRoutes from './routes/sales.routes.js';
import visitScheduleRoutes from './routes/visit_schedule.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
// MOUNTING ROUTES
app.use('/api/v1/healthcheck', healthcheckRoutes);
app.use('/api/v1/goats', goatRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/visit-schedules', visitScheduleRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.all('*', (req, res, next) => {
    const err = new ApiError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});
//! GLOBAL ERROR MIDDLEWARE
app.use(globalErrorHandler);
export { app };
//# sourceMappingURL=app.js.map