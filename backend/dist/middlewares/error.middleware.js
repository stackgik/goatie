import { ApiError } from '../utils/ApiError.js';
//* A function that handles errors in development
const devErrors = (res, error) => {
    let { status, statusCode, message } = error;
    statusCode = statusCode || 500;
    status = status || 'error';
    res.status(statusCode).json({
        status,
        message,
        error,
        stackTrace: error.stack,
    });
};
const prodErrors = (res, error) => {
    let { status, statusCode, message, isOperational } = error;
    statusCode = statusCode || 500;
    status = status || 'error';
    if (isOperational) {
        res.status(statusCode).json({
            status,
            message,
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later',
        });
    }
};
const castErrorHandler = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new ApiError(message, 400); // Creating a new ApiError object with the message and status code 400
};
const duplicateFieldErrorHandler = (err) => {
    // const message = `Duplicate ${err.keyValue.name} field entered. Please enter another value`;
    const duplicateField = Object.keys(err.keyValue)[0]; //Object.keys(err.keyValue) returns an array of all keys in the keyValue object.
    const duplicateValue = err.keyValue[duplicateField]; //err.keyValue[duplicateField] returns the value of the key in the keyValue object.
    const message = `Duplicate field: '${duplicateField}' with value '${duplicateValue}' already exists. Please use a different value.`;
    return new ApiError(message, 400);
};
const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors)
        .map((el) => el.path)
        .join(', ');
    const message = `${errors} field(s) are required.`;
    return new ApiError(message, 400);
};
const tokenExpiredErrorHandler = (err) => {
    const message = 'session expired. Please log in again.';
    return new ApiError(message, 401);
};
const jsonWebTokenErrorHandler = (err) => {
    const message = 'Invalid token. Please log in again.';
    return new ApiError(message, 401);
};
// ! This is a middleware function that handles all errors that occur in the application, excluding unhandledRejection and uncaughtException
const globalErrorHandler = (error, req, res, next) => {
    if (process.env.NODE_ENV === 'development')
        devErrors(res, error);
    if (process.env.NODE_ENV === 'production') {
        // There can be different errors and we need to handle them differently in production, sending the right message to the client.
        let err = { ...error, name: error.name, message: error.message }; // Making a shallow copy the error object received by the globalErrorHandler function, while also explicitly adding the needed non-enumerable properties to the new object.
        if (err.name === 'CastError')
            err = castErrorHandler(err); //checking if the error is a CastError and if so, calling the handleCastErrorDB function
        if (err.code === 11000)
            err = duplicateFieldErrorHandler(err); //checking if the error is a duplicate field error and if so, calling the handleDuplicateFieldDB function
        if (err.name === 'ValidationError')
            err = validationErrorHandler(err);
        if (err.name === 'TokenExpiredError')
            err = tokenExpiredErrorHandler(err);
        if (err.name === 'JsonWebTokenError')
            err = jsonWebTokenErrorHandler(err);
        prodErrors(res, err);
    }
};
export { globalErrorHandler };
//# sourceMappingURL=error.middleware.js.map