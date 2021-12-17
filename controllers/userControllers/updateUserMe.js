const User = require("../../user");

module.exports.updateUserMe = (req, res) => {
  const me = [req.user._id];
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    me,
    { name, about, avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
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
