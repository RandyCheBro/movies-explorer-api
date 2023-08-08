require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
/* const cors = require('cors'); */
const cors = require('./middlewares/cors');

const app = express();

const routes = require('./routes/routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

/* const { PORT = 3000, MONGOOSE_CONNECT = 'mongodb://127.0.0.1:27017/filmsdb' } = process.env; */
const { PORT, MONGOOSE_CONNECT } = require('./utils/config');

app.use(cors);
mongoose.connect(MONGOOSE_CONNECT);

app.use(express.json());

app.use(requestLogger);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
