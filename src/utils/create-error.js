const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  next(error);
};

module.exports = createError;
