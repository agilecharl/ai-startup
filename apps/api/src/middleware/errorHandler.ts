import { NextFunction, Request, Response } from 'express';

// Global error handler middleware
export const globalErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Global error handler caught error:', error);

    // Don't send error details in production
    const isDevelopment = process.env.NODE_ENV !== 'production';

    const errorResponse = {
        error: 'Internal server error',
        message: 'An unexpected error occurred',
        ...(isDevelopment && {
            details: error.message,
            stack: error.stack,
        }),
    };

    res.status(500).json(errorResponse);
};

// Wrapper for async route handlers to catch errors automatically
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Validation middleware
export const validateRequest = (validationRules: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Basic validation logic can be added here
            // For now, just continue to next middleware
            next();
        } catch (error) {
            res.status(400).json({
                error: 'Validation failed',
                message: 'Invalid request data',
            });
        }
    };
};

// 404 handler for undefined routes
export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found`,
    });
};
