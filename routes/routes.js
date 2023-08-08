const routes = require('express').Router();

const movieRoutes = require('./movieRoutes');
const userRoutes = require('./userRoutes');
const { validationLogin, validationCreateUser } = require('../middlewares/validations');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

routes.post('/signin', validationLogin, login);
routes.post('/signup', validationCreateUser, createUser);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.use('*', (req, res, next) => {
  next(new NotFound('Некорректный маршрут'));
});

module.exports = routes;
