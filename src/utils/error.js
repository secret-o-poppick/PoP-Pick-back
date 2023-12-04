class CustomError extends Error {
  constructor(message, statusCode = 500, name = "Internal Server Error") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class APIError extends CustomError {
  constructor(message, statusCode = 500, name = "Internal Server Error") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class NotFoundError extends CustomError {
  constructor(message, statusCode = 404, name = "Not Found") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class ValidationError extends CustomError {
  constructor(message, statusCode = 400, name = "ValidationError", opt = []) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.detail = opt;
  }
}

class AuthError extends CustomError {
  constructor(message, statusCode = 401, name = "Unauthorized") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class SchemaNotFoundError extends CustomError {
  constructor(message, statusCode = 500, name = "SchemaNotFoundError") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class DuplicateError extends CustomError {
  constructor(message, statusCode = 400, name = "DuplicateError") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

module.exports = {
  CustomError,
  APIError,
  NotFoundError,
  ValidationError,
  AuthError,
  SchemaNotFoundError,
  DuplicateError,
};
