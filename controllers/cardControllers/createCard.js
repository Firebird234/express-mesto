const Card = require("../../card");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = [req.user._id];
  Card.create({ name, link, owner })
    .then(({ name, link, owner, likes, _id }) =>
      res.send({ name, link, owner, likes, _id })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Кажись косяк в введенных данных, будь котиком, проверь",
        });
      }
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
