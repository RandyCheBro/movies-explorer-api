const {
  MONGOOSE_CONNECT = 'mongodb://127.0.0.1:27017/filmsdb',
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  MONGOOSE_CONNECT,
  PORT,
  JWT_SECRET,
  NODE_ENV,
};
