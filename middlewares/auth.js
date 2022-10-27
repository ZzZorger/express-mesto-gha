const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'secret_default' } = process.env;

// const handleAuthError = (res) => {
//   res
//     .status(401)
//     .send({ message: 'Необходима авторизация' });
// };

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    // return handleAuthError(res);
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return handleAuthError(res);
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
