const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};
module.exports.getUserMe = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};
module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный формат id' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
      // res.status(200).send({ data: user });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //       return Promise.reject(new Error('Неправильные почта или пароль'));
  //     }
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then((matched) => {
  //     if (!matched) {
  //       return Promise.reject(new Error('Неправильные почта или пароль'));
  //     }
  //     res.send({ message: 'Всё верно!' });
  //   })
  //   .catch((err) => {
  //     res
  //       .status(401)
  //       .send({ message: err.message });
  //   });
};
