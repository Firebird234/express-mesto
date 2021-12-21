const Card = require('../../models/card');

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'НЕВЕРНЫЙ ID ' });
      }
      const { name, link, owner, likes, _id } = user;
      return res.send({ name, link, owner, likes, _id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Косяяяяк, эта карточка итак уже тютю=-(Была да вся вышла...',
        });
      }
      return res.status(500).send({ erro: err.name, message: 'Произошла ошибка' });
    });
};
