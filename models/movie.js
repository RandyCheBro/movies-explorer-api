const mongoose = require('mongoose');
const validator = require('validator');
const { messages } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  // страна создания фильма.
  country: {
    type: String,
    required: true,
  },
  // режиссёр фильма.
  director: {
    type: String,
    required: true,
  },
  // год выпуска фильма.
  year: {
    type: String,
    required: true,
  },
  // длительность фильма.
  duration: {
    type: Number,
    required: true,
  },
  // описание фильма.
  description: {
    type: String,
    required: true,
  },
  // ссылка на постер к фильму.
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: `${messages.validationSchemaErr}`,
    },
  },
  // ссылка на трейлер фильма.
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: `${messages.validationSchemaErr}`,
    },
  },
  // миниатюрное изображение постера к фильму.
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: `${messages.validationSchemaErr}`,
    },
  },
  // _id пользователя, который сохранил фильм.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer.
  movieId: {
    type: Number,
    required: true,
  },
  // название фильма на русском языке.
  nameRU: {
    type: String,
    required: true,
  },
  // название фильма на английском языке.
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
