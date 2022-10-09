const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');


const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '6342efd3f405cf9b614b7996'
  };

  next();
});
app.use('/users', userRouter)
app.use('/cards', cardRouter)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})


