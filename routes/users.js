const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUser, getUserMe, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

const URLregex = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserId);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URLregex),
  }),
}), updateAvatar);

module.exports = router;

// router.patch('/me', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(URLregex),
//     email: Joi.string().min(5).required().email(),
//     password: Joi.string().required().min(8),
//   }),
// }), updateUser);
// s
