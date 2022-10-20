const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./midllewares/auth');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
// app.use((req, res, next) => {
//   req.user = {
//     _id: '6342efd3f405cf9b614b7996',
//   };
//   next();
// });
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', (req, res) => (
  res.status(404).send({ message: 'Страница не найдена' })
));
app.listen(PORT, () => {
});
