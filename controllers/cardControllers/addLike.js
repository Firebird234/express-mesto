const Card = require('../../models/card');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.addLike = (req, res, next) => {
  const me = req.user.id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: me } },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'НЕВАЛИДНЫЙ ID КАРТОЧКИ' });
      }
      const { _id, name, owner, link, likes } = user;
      return res.send({ _id, name, owner, link, likes });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundIdError();
      }
      throw new ServerError();
    })
    .catch(next);
};
