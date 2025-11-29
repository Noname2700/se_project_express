class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequestError';
  }
}

class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnAuthorizedError';
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'ConflictError';
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = 'InternalServerError';
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message = "An error occurred on the server" } = err;
  res.status(statusCode).json({ message });
};

module.exports = {
  BadRequestError,
  UnAuthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  errorHandler,
};
