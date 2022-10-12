const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
});
// userSchema.static.validateEmail = function (email) {
//   return this.findOne({ email })
//   .then((user) {
//     if (!user) {
//       return Promise.reject.compare(new Error('Неправильные почта или пароль'));
//     }
//   })
// };

module.exports = mongoose.model('user', userSchema);
