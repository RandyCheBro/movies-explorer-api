const userRoutes = require('express').Router();
const { validationUpdateUser } = require('../middlewares/validations');
const {
  updateUser, getUserMe,
} = require('../controllers/users');

userRoutes.patch('/me', validationUpdateUser, updateUser);
userRoutes.get('/me', getUserMe);
module.exports = userRoutes;
