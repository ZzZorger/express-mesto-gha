const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(users => res.status(200).send({ data: users}))
  .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'ValidationError'){
      return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки'})
    }
    res.status(500).send({ message: 'Ошибка по умолчанию'})
  });
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(card => {
    if (card === null) {
      return res.status(404).send({message: 'Карточка с указанным _id не найдена'})
    }
    res.status(200).send({ message: 'Карточка удалена' })
  })
  .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: {likes: req.user._id} },
    { new: true }
  )
  .then(card => {
    if (card === null) {
      return res.status(404).send({message: 'Передан несуществующий _id карточки'})
    }
    res.status(200).send({ message: `На карточку поставлен лайк` })
  })
  .catch((err) => {
    if (err.name === 'CastError'){
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка'})
    }
    res.status(500).send({ message: 'Ошибка по умолчанию'})
  });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: {likes: req.user._id} },
    { new: true }
  )
  .then(card => {
    if (card === null) {
      return res.status(404).send({message: 'Передан несуществующий _id карточки'})
    }
    res.status(200).send({ message: `С карточки снят лайк` })
  })
  .catch((err) => {
    if (err.name === 'CastError'){
      return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка'})
    }
    res.status(500).send({ message: 'Ошибка по умолчанию'})
  });
};