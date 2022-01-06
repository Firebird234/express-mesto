const Card = require('../../models/card');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((user) => res.send(user))
    .catch((err) => {
      throw new ServerError();
    })
    .catch(next);
};
