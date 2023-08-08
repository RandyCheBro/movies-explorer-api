const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');

const { JWT_SECRET } = process.env;

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound(
          `Ошибка ${NotFound.name},Пользователь с указанным _id не найден.`,
        );
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest(
            `Ошибка ${err.name}, Переданы некорректные данные при обновлении профиля.`,
          ),
        );
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      }).then(() => {
        res.status(200).send({
          name,
          email,
        });
      })
        // eslint-disable-next-line consistent-return
        .catch((err) => {
          if (err.code === 11000) {
            return next(
              new Conflict(
                `Ошибка ${err.name}, Данный email уже используется другим пользователем`,
              ),
            );
          }
          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      // eslint-disable-next-line no-undef
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest(
            `Ошибка ${err.name}, Переданы некорректные данные при создании пользователя.`,
          ),
        );
      } else {
        next(err);
      }
    });
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUser,
  login,
  getUserMe,
};
