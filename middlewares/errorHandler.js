module.exports = (err, req, res, next) => {
  // console.dir(err.errorCode);

  // const { errorCode = 500, message = 'Неизвестная ошибка сервера' } = err;
  // res.status(errorCode).send({ message });
  // next();

  const errorCode = err.errorCode || 500;

  const message = errorCode === 500 ? 'Неизвестная ошибка сервера' : err.message;
  res.status(errorCode).send({ message });
  next();
};
