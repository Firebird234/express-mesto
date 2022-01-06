const Card = require('../../models/card');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      console.log('card found');
      if (req.user.id === card.owner.toString()) {
        console.log('if = TRUE');
        return Card.findByIdAndRemove(req.params.cardId).then((user) => {
          if (!user) {
            return Promise.reject(new Error('НЕВЕРНЫЙ ID'));
          }
          const { name, link, owner, likes, _id } = user;

          return res.send({ name, link, owner, likes, _id });
        });
      }
      return res.status(500).send({ message: 'Не твое-нетрогай' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log('catch inside if');
        throw new NotFoundIdError();
      }
      console.log('catch outside if');
      throw new ServerError();
    })
    .catch(next);
};
