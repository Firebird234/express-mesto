const User = require("../../models/user");

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "НЕВЕРНЫЙ ID ЮЗЕРА" });
      }
      const { name, about, avatar, _id } = user;
      res.send({ name, about, avatar, _id });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "А вот и нет такого пользователя, плохой из тебя сыщик",
        });
      }
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
