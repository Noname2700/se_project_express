class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnAuthorizedError';
  }
}

module.exports = UnAuthorizedError;
