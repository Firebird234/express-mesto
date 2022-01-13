const Card = require('../../models/card');

const { ServerError } = require('../../errors/ServerError');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((user) => res.send(user))
    .catch((err) => {
      throw new ServerError();
    })
    .catch(next);
};
