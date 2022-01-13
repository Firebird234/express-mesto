const Card = require('../../models/card');

const { ServerError } = require('../../errors/ServerError');
const { UserNoundError } = require('../../errors/UserNoundError');

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
        return next(new NotFoundIdError());
      }
      const { name, link, owner, likes, _id } = user;
      res.send({ name, link, owner, likes, _id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundIdError());
      } else {
        next(new ServerError());
      }
    });
};
