const router = require('express').Router();
const {
  getUser, getUserMe, getUserId, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:userId', getUserId);
// router.post('/', createUser);
router.post('/signup', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.post('/signin', login);

module.exports = router;
