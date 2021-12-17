const User = require("../../user");

module.exports.updateUserMeAva = (req, res) => {
  const me = [req.user._id];
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    me,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then(({ avatar }) => res.send({ avatar }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Кажись косяк в твоей аватарке, и что ты мне сделаешь?",
        });
      }
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
