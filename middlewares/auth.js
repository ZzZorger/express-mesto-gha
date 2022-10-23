const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return handleAuthError(res);
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  return next();
};
