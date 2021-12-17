const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const Card = require("./card");

const cardRouter = require("./routers/cardRouter.js");
const userRouter = require("./routers/userRouter.js");

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "61b77241c9b7656728c709de",
  };

  next();
});
module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

app.use("/", cardRouter);
app.use("/", userRouter);

app.listen(3000, () => {
  console.log("ПОРТ ЕБОШИТ КАК КОНЬ");
});

// const express = require("express");
// const mongoose = require("mongoose");
// const User = require("./user");
// const bodyParser = require("body-parser");
// const Card = require("./card");

// const app = express();
// mongoose.connect("mongodb://localhost:27017/mestodb");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: "61b77241c9b7656728c709de",
//   };

//   next();
// });

// module.exports.createCard = (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };
// //ЮЗЕР-ЗАПРОСЫ
// app.get("/users", (req, res) => {
//   User.find()
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
// });

// app.get("/users/:userId", (req, res) => {
//   User.findById(req.user._id)
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
// });

// app.post("/users", (req, res) => {
//   const { name, about, avatar } = req.body;
//   console.log(name, about, avatar);
//   User.create({ name, about, avatar })
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
// });

// app.patch("/users/me", (req, res) => {
//   const me = [req.user._id];
//   const { name, about, avatar } = req.body;
//   User.findByIdAndUpdate(
//     me,
//     { name, about, avatar },
//     {
//       new: true, // обработчик then получит на вход обновлённую запись
//       runValidators: true, // данные будут валидированы перед изменением
//       upsert: true, // если пользователь не найден, он будет создан
//     }
//   )
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
// });

// app.patch("/users/me/avatar", (req, res) => {
//   const me = [req.user._id];
//   const { avatar } = req.body;
//   User.findByIdAndUpdate(
//     me,
//     { avatar },
//     {
//       new: true, // обработчик then получит на вход обновлённую запись
//       runValidators: true, // данные будут валидированы перед изменением
//       upsert: true, // если пользователь не найден, он будет создан
//     }
//   )
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
// });

// //_____________________________ЮЗЕР-ЗАПРОСЫ

// app.listen(3000, () => {
//   console.log("ПОРТ ЕБОШИТ КАК КОНЬ");
// });

// //КАРТОЧКИ
// app.post("/cards", (req, res) => {
//   const { name, link } = req.body;
//   const owner = [req.user._id];
//   Card.create({ name, link, owner })
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ err, message: "Произошла ошибка" }));
// });

// app.get("/cards", (req, res) => {
//   Card.find()
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ err, message: "Произошла ошибка" }));
// });

// app.delete("/cards/:cardId", (req, res) => {
//   Card.findByIdAndRemove(req.params.cardId)
//     .then((user) => res.send(user))
//     .catch((err) => res.status(500).send({ err, message: "Произошла ошибка" }));
// });

// app.put("/cards/:cardId/likes", (req, res) => {
//   const me = req.user._id;
//   const cardId = req.params.cardId;
//   Card.findByIdAndUpdate(
//     cardId,
//     { $addToSet: { likes: me } },
//     {
//       new: true, // обработчик then получит на вход обновлённую запись
//       runValidators: true, // данные будут валидированы перед изменением
//       upsert: true, // если пользователь не найден, он будет создан
//     }
//   )
//     .then((card) => res.send(card))
//     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
// });

// app.delete("/cards/:cardId/likes", (req, res) => {
//   const me = req.user._id;
//   const cardId = req.params.cardId;
//   Card.findByIdAndUpdate(
//     cardId,
//     { $pull: { likes: me } },
//     {
//       new: true, // обработчик then получит на вход обновлённую запись
//       runValidators: true, // данные будут валидированы перед изменением
//       upsert: true, // если пользователь не найден, он будет создан
//     }
//   )
//     .then((card) => res.send(card))
//     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
// });
// //_____________________________КАРТОЧКИ
