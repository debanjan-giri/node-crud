const errorHandler = (error, req, res, next) => {
  // server console
  console.error("Error:", error.message);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error.";

  // Handle token-related errors separately
  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired.";
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token.";
  }

  // handle database erros separately
  if (error.name === "ValidationError") {
    statusCode = 401;
    message = "its not valid data";
  }

  // server last response is error handler
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorHandler;
