export const errorHandler = (res , statusCode , message) => {
    res.status(statusCode).json({
        success: false,
        message
    });
};