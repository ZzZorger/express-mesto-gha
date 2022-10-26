const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  console.log(err)
  const { statusCode = 500, message = 'Неизвестная ошибка сервера' } = err;
  if (err.errorCode) {
    res.status(err.errorCode).send({ message: err.message });
  } else {
    res.status(statusCode)
      .json({ message: statusCode === 500 ? 'Неизвестная ошибка сервера' : message });
  }
  next();
};
