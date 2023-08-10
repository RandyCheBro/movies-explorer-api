const urlRegExp = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

const messages = {
  validationErr: 'Переданы некорректные данные',
  notFoundMovies: 'Сохраненные фильмы не найдены.',
  notFoundMoviesId: 'Фильм с указанным _id не найден.',
  forbiddenDeleteMovie: 'Нет прав для удаления чужого фильма.',
  notFoundUser: 'Пользователь с указанным _id не найден.',
  conflictUserErr: 'Данный email уже используется другим пользователем',
  unauthorizedErr: 'Необходима авторизация',
  validationSchemaErr: 'Ошибка валидации',
  wrongRegData: 'Неправильные почта или пароль',
  wrongRoute: 'Некорректный маршрут',
  dropServerErr: 'Сервер сейчас упадёт',
  deleteMovieSuccess: 'Фильм удален',
};

module.exports = {
  urlRegExp,
  messages,
};
