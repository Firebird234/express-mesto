class incorrectTokenError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Проблемы с токеном';
    this.statusCode = 401;
  }
}

module.exports = {
  incorrectTokenError,
};
