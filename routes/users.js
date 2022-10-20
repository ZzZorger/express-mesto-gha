const router = require('express').Router();
const {
  getUser, getUserMe, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:userId', getUserId);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
