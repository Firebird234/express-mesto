const Card = require("../../card");

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(({ name, link, owner, likes, _id }) =>
      res.send({ name, link, owner, likes, _id })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(404).send({
          message:
            "Косяяяяк, эта карточка итак уже тютю=-(Была да вся вышла...",
        });
      }
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
