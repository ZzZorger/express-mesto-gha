require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();
const URLregex = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URLregex),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(auth);
app.use('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(8),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URLregex),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().required().min(8),
  }),
}), userRouter);
app.use('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(URLregex),
    owner: Joi.string().hex().length(24).required(),
    likes: Joi.string().hex().length(24).required(),
    createdAt: Joi.date(),
  }),
}), cardRouter);
app.use('*', (req, res) => (
  res.status(404).send({ message: 'Страница не найдена' })
));
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
