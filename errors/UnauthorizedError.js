class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'unauthorizedError';
    this.errorCode = 400;
  }
}

module.exports = UnauthorizedError;
