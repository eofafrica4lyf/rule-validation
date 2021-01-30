module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let error = {...err};
    error.message = err.message;
    if(error.type && error.type === "entity.parse.failed"){
        error.message = "Invalid JSON payload passed.";
    }
    error.data = err.data;
    res.status(error.statusCode).json({
        message: error.message || "Internal Server Error.",
        status: "error",
        data: error.data || null
    })
}