const userRouter = require('express').Router();
// const { createUser } = require('../controllers/userControllers/createUser');
const { getUserId } = require('../controllers/userControllers/getUserId');
const { getUsers } = require('../controllers/userControllers/getUsers');
const { getUserMe } = require('../controllers/userControllers/getUserMe');
const { updateUserMe } = require('../controllers/userControllers/updateUserMe');
const { updateUserMeAva } = require('../controllers/userControllers/updateUserMeAva');
const { celebrate, Joi } = require('celebrate');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUserMe);

userRouter.get('/users/:userId', getUserId);

// userRouter.post('/users', createUser);

userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().min(2).max(30),
      })
      .unknown(true),
  }),
  updateUserMe,
);

userRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().min(2).max(30),
    }),
  }),
  updateUserMeAva,
);

module.exports = userRouter;
