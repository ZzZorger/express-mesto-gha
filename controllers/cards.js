const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
// module.exports.deleteCard = (req, res) => {
//   Card.findByIdAndRemove(req.params.cardId)
//     .then((card) => {
//       if (card === null) {
//         return res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
//       }
//       return res.status(200).send({ message: 'Карточка удалена' });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res.status(400).send({ message: 'Неверный формат id' });
//       }
//       return res.status(500).send({ message: 'Ошибка по умолчанию' });
//     });
// };
module.exports.deleteCard = (req, res, next) => {
  // console.log(req.params.cardId);
  const ownerId = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === ownerId) {
          // card.delete()
          //   .then(() => res.status(200).send({ message: `Карточка с id '${req.params.id}' успешно удалена` }));
          res.status(200).send({ message: `Карточка с id '${req.params.cardId}' успешно удалена` });
        } else {
          throw new ForbiddenError({ message: 'Карточка пренадлежит другому пользователю' });
          // res.status(403).send({ message: 'Карточка пренадлежит другому пользователю' });
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `'${req.params.id}' не является корректным идентификатором` });
      } else {
        next(err);
      }
    });
  // .orFail(new NotFoundError(`Карточка с id '${req.params.id}' не найдена`))
  // .orFail(res.status(404).send({ message: `Карточка с id '${req.params.cardId}' не найдена` }))
  // .then((card) => {
  //   if (card) {
  //     if (card.owner.toString() === ownerId) {
  //       card.delete()
  //         .then(() => res.status(200).send({ message: `Карточка с id '${req.params.id}' успешно удалена` }));
  //     // } else { throw new ForbiddenError({ message: 'Карточка пренадлежит другому пользователю' }); }
  //     } else { res.status(403).send({ message: 'Карточка пренадлежит другому пользователю' }); }
  //   }
  // })
  // .catch((err) => {
  //   if (err.name === 'CastError') {
  //     next(new BadRequestError(`'${req.params.id}' не является корректным идентификатором`));
  //   } else {
  //     next(err);
  //   }
  // });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(200).send({ message: 'На карточку поставлен лайк' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(200).send({ message: 'С карточки снят лайк' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
