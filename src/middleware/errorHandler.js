const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ ...err, message: err.message });

  next();
};

module.exports = {
  errorHandler,
};
