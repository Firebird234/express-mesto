const User = require('../../models/user');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.updateUserMe = (req, res, next) => {
  const me = req.user.id;
  const { name, about } = req.body;
  console.log(me);
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
      console.log(1);
      if (!user) {
        console.log(2);
        return res.status(404).send({ message: 'НЕВЕРНЫЙ ID ЮЗЕРА' });
      }
      const { name, about, _id } = user;

      return res.send({ name, about, _id });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValError();
      }
      throw new ServerError();
    })
    .catch(next);
};
