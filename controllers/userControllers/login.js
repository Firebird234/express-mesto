const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const { incorrectTokenError } = require('../../errors/incorrectTokenError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((data) => {
      if (!data) {
        return Promise.reject(new Error('У кого то кривые ручки-почта или пароль не правильные'));
      }
      req.userId = data._id;
      console.log(req, req.userId);
      return bcrypt.compare(password, data.password);
    })
    .then((passed) => {
      if (!passed) {
        return Promise.reject(new Error('У кого то кривые ручки-почта или пароль не правильные'));
      }
      const id = req.userId;
      const token = jwt.sign({ id }, 'abrakadabra,kurwa');
      console.log(passed, id);
      return res
        .cookie('token', token, { maxAge: 3600 * 24 * 7, httpOnly: true })
        .status(200)
        .send({ message: 'Вы вошли' });
    })
    .catch((err) => {
      throw new incorrectTokenError();
    })
    .catch(next);
};