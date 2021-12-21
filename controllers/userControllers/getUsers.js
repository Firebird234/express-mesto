const User = require('../../models/user');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
