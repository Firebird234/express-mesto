const jwt = require('jsonwebtoken');
const { Authorization } = require('../errors/Authorization');

module.exports.auth = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    return next(new Authorization());
  }
  let payload;
  try {
    payload = jwt.verify(authorization, 'abrakadabra,kurwa');
  } catch (err) {
    return next(new Authorization());
  }

  req.user = payload;
  return next();
};
