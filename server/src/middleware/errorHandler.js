import { validationResult } from 'express-validator';

/**
 * Runs after the express-validator rule chains. If any validation
 * errors were collected, responds with 400 and a list of messages
 * instead of reaching the controller.
 */
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array({ onlyFirstError: true })[0].msg,
      errors: errors.array({ onlyFirstError: true }).map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  return next();
}

/**
 * Catches requests to undefined routes.
 */
export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.method} ${req.originalUrl}`));
}

/**
 * Centralized error handler. Must be registered last, after all routes.
 */
export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(' ');
  }

  // Mongoose cast error (e.g. malformed ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid request data.';
  }

  console.error(`[Error] ${req.method} ${req.originalUrl} ->`, err.message);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}
