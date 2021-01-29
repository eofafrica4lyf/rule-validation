module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let error = {...err};
    error.message = err.message;
    res.status(error.statusCode).json({
        success: false,
        message: error.message || "Internal Server Error."
    })
}