const User = require('../../models/user');

module.exports.getUserMe = (req, res, next) => {
  console.log(req.user);
  User.findOne(req.user)
    .then((me) => res.status(200).send({
      me,
    }))
    .catch((err) => {
      next(err);
    });
};
