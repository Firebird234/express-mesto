const userRouter = require('express').Router();
const { createUser } = require('../controllers/userControllers/createUser');
const { getUserId } = require('../controllers/userControllers/getUserId');
const { getUsers } = require('../controllers/userControllers/getUsers');
const { updateUserMe } = require('../controllers/userControllers/updateUserMe');
const { updateUserMeAva } = require('../controllers/userControllers/updateUserMeAva');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserId);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', updateUserMe);

userRouter.patch('/users/me/avatar', updateUserMeAva);

module.exports = userRouter;
