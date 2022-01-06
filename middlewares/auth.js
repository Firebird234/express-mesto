const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    return res.status(401).send({ message: '1/Необходима авторизация', authorization });
  }
  let payload;
  try {
    payload = jwt.verify(authorization, 'abrakadabra,kurwa');
  } catch (err) {
    return res.status(401).send({ message: '2/Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
