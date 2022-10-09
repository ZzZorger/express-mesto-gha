const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
  .then(users => res.status(200).send({ data: users}))
  .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию'}));
}
module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    if (!user) {
      return res.status(404).send({message: 'Пользователь по указанному _id не найден'})
    }
    res.status(200).send({ data: user })
  })
  .catch((err) => {
    if(err.name === 'CastError') {
      return res.status(400).send({ message: 'Неверный формат id'})
    }
    res.status(500).send({ message: 'Ошибка по умолчанию'})
  })
}
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  .then(user => res.status(200).send({ data: user }))
  .catch((err) => {
    if (err.name === 'ValidationError'){
      return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя'})
    }
    res.status(500).send({ message: 'Ошибка по умолчанию'})
  });
}
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {new: true, runValidators: true})
  .then(user => {
    if (user === null) {
      return res.status(404).send({message: 'Пользователь с указанным _id не найден'})
    }
    res.status(200).send({ data: user })
  })
  .catch((err) => {
    if (err.name === 'ValidationError'){
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля'})
    }
    res.status(500).send({ message: 'Ошибка по умолчанию'})
  });
}
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {new: true})
  .then(user => {
    if (user === null) {
      return res.status(404).send({message: 'Пользователь с указанным _id не найден'})
    }
    res.status(200).send({ data: user })
  })
  .catch((err) => {
    if (err.name === 'ValidationError'){
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара'})
    }
    res.status(500).send({ message: 'Ошибка по умолчанию'})
  });
}