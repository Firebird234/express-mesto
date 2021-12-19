const User = require("../../models/user");

module.exports.updateUserMeAva = (req, res) => {
  const me = [req.user._id];
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    me,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "ЧЕТ С АЙДИШНИКОМ ЮЗЕРА НЕ ТАК, БРАТИШКА" });
      }
      const { avatar } = user;
      res.send({ avatar });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Кажись косяк в твоей аватарке, и что ты мне сделаешь?",
        });
      }
      res.status(500).send({ erro: err.name, message: "Произошла ошибка" });
    });
};
