const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const Card = require("./models/card");

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

app.use("/", cardRouter);
app.use("/", userRouter);
app.use((req, res) => {
  res.status(400).send({ message: "Чет ниработает ничо, ну соре тогда" });
});

app.listen(3000, () => {
  console.log("ПОРТ ЕБОШИТ КАК КОНЬ");
});
