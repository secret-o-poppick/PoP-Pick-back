class APIError extends Error {
  constructor(message, statusCode = 500, name = 'Internal Server Error') {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class NotFoundError extends Error {
  constructor(message, statusCode = 404, name = 'Not Found') {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class ValidationError extends Error {
  constructor(message, statusCode = 400, name = 'ValidationError', opt = []) {
    super(message);
    this.statusCode = statusCode;
    this.detail = opt;
  }
}

class AuthError extends Error {
  constructor(message, statusCode = 401, name = 'Unauthorized') {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class SchemaNotFoundError extends Error {
  constructor(message, statusCode = 500, name = 'SchemaNotFoundError') {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class DuplicateError extends Error {
  constructor(message, statusCode = 400, name = 'DuplicateError') {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export {
  APIError,
  NotFoundError,
  ValidationError,
  AuthError,
  SchemaNotFoundError,
  DuplicateError,
};
