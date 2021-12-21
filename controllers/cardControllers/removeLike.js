const Card = require('../../models/card');

module.exports.removeLike = (req, res) => {
  const me = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: me } },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'НЕВЕРНЫЙ ID' });
      }
      const { name, link, owner, likes, _id } = user;
      res.send({ name, link, owner, likes, _id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Косяяяяк, больше нетю этой карточки=-(Была да вся вышла...',
        });
      }
      return res.status(500).send({ erro: err.name, message: 'Произошла ошибка' });
    });
};
