const ErrorHandler = require("../util/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong MongoId Error
  if (err.name === "castError") {
    const message = `Resource Not found, Invalid :${err.path}`;
    err = new ErrorHandler(message, 404);
  }
  //Mongoose Duplicate Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  //jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token Is Invalid`;
    err = new ErrorHandler(message, 404);
  }
  //jwt token expire
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token expired`;
    err = new ErrorHandler(message, 404);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
