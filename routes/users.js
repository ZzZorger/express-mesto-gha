const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUser, getUserMe, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

const avatarRegexp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
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
    avatar: Joi.string().pattern(avatarRegexp),
  }),
}), updateAvatar);

module.exports = router;
