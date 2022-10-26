module.exports = (err, req, res, next) => {
  console.dir(err);
  const { errorCode = 500, message = 'Неизвестная ошибка сервера' } = err;
  res.status(errorCode).send({ message });
  // if (err.errorCode) {
  //   res.status(err.errorCode).send({ message: err.message });
  // } else {
  //   res.status(statusCode)
  //     .json({ message: statusCode === 500 ? 'Неизвестная ошибка сервера' : message });
  // }
  next();
};
