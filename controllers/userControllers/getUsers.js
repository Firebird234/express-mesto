const User = require('../../models/user');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((user) => res.send(user))
    .catch(() => {
      throw new ServerError();
    })
    .catch(next);
};
