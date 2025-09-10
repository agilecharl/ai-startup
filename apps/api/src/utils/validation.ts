// Common validation utilities
export class ValidationUtils {
    /**
     * Validates if a value is a valid positive integer
     */
    static isValidId(value: any): boolean {
        return typeof value === 'string' && /^\d+$/.test(value) && parseInt(value, 10) > 0;
    }

    /**
     * Validates if a string is non-empty after trimming
     */
    static isNonEmptyString(value: any): boolean {
        return typeof value === 'string' && value.trim().length > 0;
    }

    /**
     * Validates if a value is a valid number (including negative)
     */
    static isValidNumber(value: any): boolean {
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
    }

    /**
     * Validates if a value is a valid non-negative number
     */
    static isValidNonNegativeNumber(value: any): boolean {
        const parsed = typeof value === 'string' ? parseInt(value, 10) : value;
        return this.isValidNumber(parsed) && parsed >= 0;
    }

    /**
     * Sanitizes a string by trimming whitespace
     */
    static sanitizeString(value: string): string {
        return typeof value === 'string' ? value.trim() : '';
    }

    /**
     * Validates email format (basic validation)
     */
    static isValidEmail(email: any): boolean {
        if (typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validates if a value exists (not null, undefined, or empty string)
     */
    static isRequired(value: any): boolean {
        return value !== null && value !== undefined && value !== '';
    }

    /**
     * Validates object ID format for MongoDB
     */
    static isValidObjectId(id: string): boolean {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }

    /**
     * Escapes special characters to prevent SQL injection
     */
    static escapeSqlString(value: string): string {
        if (typeof value !== 'string') return '';
        return value.replace(/'/g, "''").replace(/;/g, '');
    }
}

// Error response builder
export class ErrorResponse {
    static badRequest(message: string, details?: string) {
        return {
            error: 'Bad Request',
            message,
            ...(details && { details }),
        };
    }

    static notFound(message: string = 'Resource not found') {
        return {
            error: 'Not Found',
            message,
        };
    }

    static internalError(message: string = 'Internal server error') {
        return {
            error: 'Internal Server Error',
            message,
        };
    }

    static validation(message: string, field?: string) {
        return {
            error: 'Validation Error',
            message,
            ...(field && { field }),
        };
    }
}
