const User = require("../../user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(name, about, avatar);
  User.create({ name, about, avatar })
    .then(({ name, about, avatar, _id }) =>
      res.send({ name, about, avatar, _id })
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
