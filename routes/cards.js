const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const URLregex = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(URLregex).required(),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    owner: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  body: Joi.object().keys({
    owner: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;

// celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     link: Joi.string().pattern(URLregex),
//     owner: Joi.string().hex().length(24).required(),
//     likes: Joi.string().hex().length(24).required(),
//     createdAt: Joi.date(),
//   }),
// }),
