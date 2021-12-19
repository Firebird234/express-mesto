const Card = require("../../models/card");

module.exports.getCards = (req, res) => {
  Card.find()
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
