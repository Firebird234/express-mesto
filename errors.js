class NotFoundIdError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Не найдено';
  }
}

class UserNoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = 'А вот и нет такого пользователя, плохой из тебя сыщик';
  }
}

class ValError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Кажись косяк в введенных данных, будь котиком, проверь';
  }
}

class incorrectTokenError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Проблемы с токеном';
    this.statusCode = 401;
  }
}

class userCreatedError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Такой мэйл уже зарегистрирован';
    this.statusCode = 409;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Ошибка сервера';
    this.statusCode = 500;
  }
}

module.exports = {
  NotFoundIdError,
  ValError,
  incorrectTokenError,
  userCreatedError,
  ServerError,
  UserNoundError,
};
