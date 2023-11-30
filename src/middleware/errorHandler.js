const { CustomError } = require('../utils/error.js');

const errorHandler = (err, req, res, next) => {
  const error = err instanceof CustomError ? err : new CustomError(err);

  res.status(error.statusCode).json({ ...error, message: error.message });

  next();
};

module.exports = {
  errorHandler,
};
