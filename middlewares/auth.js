const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { messages } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized(`${messages.unauthorizedErr}`));
    return;
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new Unauthorized(`${messages.unauthorizedErr}`));
    return;
  }
  req.user = payload;
  next();
};
