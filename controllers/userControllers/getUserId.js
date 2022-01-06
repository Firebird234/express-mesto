const User = require('../../models/user');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new UserNoundError();
      }
      const { name, about, avatar, _id } = user;
      return res.send({ name, about, avatar, _id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundIdError();
      }
      throw new ServerError();
    })
    .catch(next);
};
