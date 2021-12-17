const Card = require("../../card");

module.exports.addLike = (req, res) => {
  const me = req.user._id;
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: me } },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then(({ name, link, owner, likes, _id }) =>
      res.send({ name, link, owner, likes, _id })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(404).send({
          message: "Косяяяяк, больше нетю этой карточки=-(Была да вся вышла...",
        });
      }
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
