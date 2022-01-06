const User = require('../../models/user');
const {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
} = require('../../errors');

module.exports.updateUserMeAva = (req, res, next) => {
  const me = req.user.id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    me,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'ЧЕТ С АЙДИШНИКОМ ЮЗЕРА НЕ ТАК, БРАТИШКА' });
      }
      const { avatar } = user;
      res.send({ avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValError();
      }
      throw new ServerError();
    })
    .catch(next);
};
