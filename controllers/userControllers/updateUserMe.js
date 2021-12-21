const User = require('../../models/user');

module.exports.updateUserMe = (req, res) => {
  const me = [req.user._id];
  const { name, about } = req.body;
  if (!name || !about) {
    return res.status(400).send({ message: 'Поля "name" и "about" должно быть заполнены' });
  }
  return User.findByIdAndUpdate(
    me,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'НЕВЕРНЫЙ ID ЮЗЕРА' });
      }
      const { name, about, _id } = user;

      return res.send({ name, about, _id });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Кажись косяк в введенных данных, будь котиком, проверь',
        });
      }
      return res.status(500).send({ erro: err.name, message: 'Произошла ошибка' });
    });
};
