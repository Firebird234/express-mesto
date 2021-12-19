const Card = require("../../models/card");

module.exports.addLike = (req, res) => {
  const me = req.user._id;
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: me } },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "НЕВАЛИДНЫЙ ID КАРТОЧКИ" });
      }
      const { _id, name, owner, link, likes } = user;
      res.send({ _id, name, owner, link, likes });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Косяяяяк, больше нетю этой карточки=-(Была да вся вышла...",
        });
      }
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
