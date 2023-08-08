const {
  MONGOOSE_CONNECT = 'mongodb://localhost:27017/filmsdb',
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
