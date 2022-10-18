const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

// const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://localhost:27017/mestodb');
// app.use((req, res, next) => {
//   req.user = {
//     _id: '6342efd3f405cf9b614b7996',
//   };
//   next();
// });
app.use('/users', userRouter);
// app.use(auth);
app.use('/cards',auth, cardRouter);
app.use('*', (req, res) => (
  res.status(404).send({ message: 'Страница не найдена' })
));
app.listen(PORT, () => {
});
