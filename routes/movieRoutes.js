const movieRoutes = require('express').Router();
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validations');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

movieRoutes.post('/', validationCreateMovie, createMovie);

movieRoutes.get('/', getMovies);

movieRoutes.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = movieRoutes;
