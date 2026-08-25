const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errorResponse = {
        status: 'error',
        statusCode,
        message,
    };
    res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;