const Card = require('../../models/card');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.removeLike = (req, res, next) => {
  const me = req.user.id;
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
        throw new NotFoundIdError();
      }
      throw new ServerError();
    })
    .catch(next);
};
