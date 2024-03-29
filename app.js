require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middlewares/rateLimiter');

const app = express();

const { messages } = require('./utils/constants');
const routes = require('./routes/routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGOOSE_CONNECT } = require('./utils/config');

const corsOptions = {
  origin: [
    'https://api.movie.nomoreparties.co',
    'https://api.movie.nomoreparties.co',
    'http://movie.nomoreparties.co',
    'http://movie.nomoreparties.co',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use('*', cors(corsOptions));

mongoose.connect(MONGOOSE_CONNECT);

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(`${messages.dropServerErr}`);
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
});
