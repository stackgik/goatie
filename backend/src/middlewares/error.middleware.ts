import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

// Extend the base Error interface for ApiError
interface IApiError extends Error {
  statusCode: number;
  status: 'fail' | 'error';
  isOperational: boolean;

  //* This needed to be explicitly specified because it is a mongoose way of structuring its error object, not really an in-built Error object thing.
  code?: number;
}

//* A function that handles errors in development
const devErrors = (res: Response, error: IApiError) => {
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

const prodErrors = (res: Response, error: IApiError) => {
  let { status, statusCode, message, isOperational } = error;
  statusCode = statusCode || 500;
  status = status || 'error';

  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong! Please try again later',
    });
  }
};

const castErrorHandler = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ApiError(message, 400); // Creating a new ApiError object with the message and status code 400
};

const duplicateFieldErrorHandler = (err: any) => {
  // const message = `Duplicate ${err.keyValue.name} field entered. Please enter another value`;
  const duplicateField = Object.keys(err.keyValue)[0]; //Object.keys(err.keyValue) returns an array of all keys in the keyValue object.
  const duplicateValue = err.keyValue[duplicateField]; //err.keyValue[duplicateField] returns the value of the key in the keyValue object.
  const message = `Duplicate field: '${duplicateField}' with value '${duplicateValue}' already exists. Please use a different value.`;
  return new ApiError(message, 400);
};

const validationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors)
    .map((el: any) => el.path)
    .join(', ');
  const message = `${errors} field(s) are required.`;

  return new ApiError(message, 400);
};

const tokenExpiredErrorHandler = (err: any) => {
  const message = 'session expired. Please log in again.';
  return new ApiError(message, 401);
};

const jsonWebTokenErrorHandler = (err: any) => {
  const message = 'Invalid token. Please log in again.';
  return new ApiError(message, 401);
};

// ! This is a middleware function that handles all errors that occur in the application, excluding unhandledRejection and uncaughtException
const globalErrorHandler = (
  error: IApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') devErrors(res, error);

  if (process.env.NODE_ENV === 'production') {
    // There can be different errors and we need to handle them differently in production, sending the right message to the client.
    let err: IApiError = { ...error, name: error.name, message: error.message }; // Making a shallow copy the error object received by the globalErrorHandler function, while also explicitly adding the needed non-enumerable properties to the new object.
    if (err.name === 'CastError') err = castErrorHandler(err); //checking if the error is a CastError and if so, calling the handleCastErrorDB function
    if (err.code === 11000) err = duplicateFieldErrorHandler(err); //checking if the error is a duplicate field error and if so, calling the handleDuplicateFieldDB function
    if (err.name === 'ValidationError') err = validationErrorHandler(err);
    if (err.name === 'TokenExpiredError') err = tokenExpiredErrorHandler(err);
    if (err.name === 'JsonWebTokenError') err = jsonWebTokenErrorHandler(err);

    prodErrors(res, err);
  }
};

export { globalErrorHandler };
