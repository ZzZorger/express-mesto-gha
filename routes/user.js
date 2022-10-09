const router = require('express').Router();
const user = require('../models/user.js');

router.get('/users', (req, res) => {
  user.find({})
  .then(users => res.send({ data: users}))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка'}));
});
router.get('/users/:userId', (req, res) => {
  user.findById(req.params.id)
  .then(user => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка'}));
});
router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.body)
  user.create({ name, about, avatar })
  // .then(user => res.send({ data: user }))
  // .catch(() => res.status(500).send({ message: 'Произошла ошибка'}));
})
// router.get('/', (req, res) => {
//   Film.find({})
//     .then(films => res.send({ data: films }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// });

// router.post('/', (req, res) => {
//     const { title, genre } = req.body;

//     Film.create({ title, genre })
//         .then(film => res.send({ data: film }))
//         .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// });

module.exports = router;
