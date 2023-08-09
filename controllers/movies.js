const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, year, duration, description, image, trailerLink, thumbnail,
    movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    year,
    duration,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(`Ошибка ${err.name}, Переданы некорректные данные при создании фильма. `));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFound(`Ошибка ${NotFound.name},Сохраненные фильмы не найдены.`);
      }
      res.status(200).send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound(`Ошибка ${NotFound.name},Фильм с указанным _id не найден.`);
      }
      if (!movie.owner.equals(owner)) {
        throw new Forbidden(`Ошибка ${Forbidden.name},Нет прав для удаления чужого фильма.`);
      }
      return movie.deleteOne()
        .then(() => {
          res.status(200).send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(`Ошибка ${err.name}, Переданы некорректные данные для удаления фильма.`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
