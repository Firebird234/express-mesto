const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cardRouter = require('./routers/cardRouter');
const userRouter = require('./routers/userRouter');
const { login } = require('./controllers/userControllers/login');
const { createUser } = require('./controllers/userControllers/createUser');
const { auth } = require('./middlewares/auth');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', cardRouter);
app.use('/', userRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Чет ниработает ничо, ну соре тогда' });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode === undefined ? 500 : err.statusCode).send({ message: err.message });
});

app.listen(3000, () => {
  console.log('ПОРТ ЕБОШИТ КАК КОНЬ');
});
