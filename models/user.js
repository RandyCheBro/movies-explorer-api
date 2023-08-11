const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Unauthorized = require('../errors/Unauthorized');
const { messages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: `${messages.validationSchemaErr}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(`${messages.wrongRegData}`));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(`${messages.wrongRegData}`));
          }
          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
