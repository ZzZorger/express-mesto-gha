const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message = 'Неизвестная ошибка сервера' } = err;
  if (!isCelebrateError(err)) {
    res.status(err.errorCode).send({ message: err.message });
  } else {
    res.status(statusCode)
      .json({ message: statusCode === 500 ? 'Неизвестная ошибка сервера' : message });
  }
  next();
};
