const router = require('express').Router();
const {
  getUser, getUserId, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);
// router.post('/', createUser);
router.post('/signup', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.post('/signin', login);

module.exports = router;
