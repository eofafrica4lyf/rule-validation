class ErrorHandler extends Error {
    constructor(message, statusCode, data) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;